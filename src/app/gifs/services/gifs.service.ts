import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { map, tap } from "rxjs";

import { environment } from "@environments/environment";
import { GiphyResponse } from "../interfaces/giphy.interface";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";

const loadFromLocalStorage = () => {
    const gifsFromLS = localStorage.getItem('gifs') ?? '{}';
    const gifs = JSON.parse(gifsFromLS);
    return gifs;
}

@Injectable({ providedIn: 'root' })
export class GifService {

    private http = inject(HttpClient)

    trendingGifs = signal<Gif[]>([])
    gifsLoading = signal<boolean>(false)
    private trendingPage = signal<number>(0)

    trendingGroup = computed<Gif[][]>(() => {
        const groups = [];
        for (let i = 0; i < this.trendingGifs().length; i += 3) {
            groups.push(this.trendingGifs().slice(i, i + 3))
        }

        return groups;
    })

    searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage())
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))


    constructor() {
        this.loadTrendingGifs()
    }

    saveGifsToLocalStorage = effect(() => {
        const historyString = JSON.stringify(this.searchHistory());
        localStorage.setItem('gifs', historyString);
    })

    loadTrendingGifs() {
        if (this.gifsLoading()) return;
        this.gifsLoading.set(true);


        this.http.get<GiphyResponse>(
            `${environment.giphyUrl}/gifs/trending`,
            {
                params: {
                    api_key: environment.gifsApiKey,
                    limit: 20,
                    offset: this.trendingPage() * 20
                }
            }
        ).subscribe((resp) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data)
            this.trendingGifs.update((prevGifs) => [...prevGifs, ...gifs])
            this.trendingPage.update(current => current + 1)
            this.gifsLoading.set(false)
        });
    }

    searchQueryGifs(query: string) {
        return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
            params: {
                api_key: environment.gifsApiKey,
                q: query,
                limit: 20,
            }
        }).pipe(
            map(({ data }) => GifMapper.mapGiphyItemsToGifArray(data)),
            tap(items => this.searchHistory.update(prev => ({
                ...prev,
                [query.toLocaleLowerCase()]: items
            })))
        )
    }

    getHistoryGifs(query: string) {
        return this.searchHistory()[query] ?? [];
    }
}