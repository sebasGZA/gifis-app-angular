import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http'

import { environment } from "@environments/environment";
import { GiphyResponse } from "../interfaces/giphy.interface";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";

@Injectable({ providedIn: 'root' })
export class GifService {

    private http = inject(HttpClient)
    trendingGifs = signal<Gif[]>([])

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
            this.trendingGifs.set(gifs)
        });
    }
}