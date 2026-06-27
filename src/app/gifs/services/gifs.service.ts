import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { map, tap } from "rxjs";

import { environment } from "@environments/environment";
import { GiphyResponse } from "../interfaces/giphy.interface";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";




@Injectable({ providedIn: 'root' })
export class GifService {

    private http = inject(HttpClient)

    trendingGifs = signal<Gif[]>([])
    gifsLoading = signal<boolean>(true)

    searchHistory = signal<Record<string, Gif[]>>({})
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))


    constructor() {
        this.loadTrendingGifs()
    }

    loadTrendingGifs() {
        this.http.get<GiphyResponse>(
            `${environment.giphyUrl}/gifs/trending`,
            {
                params: {
                    api_key: environment.gifsApiKey,
                    limit: 20,
                }
            }
        ).subscribe((resp) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data)
            this.gifsLoading.set(false)
            this.trendingGifs.set(gifs)
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
}