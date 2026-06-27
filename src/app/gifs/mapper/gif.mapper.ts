import { Gif } from "../interfaces/gif.interface";
import { Giphy } from "../interfaces/giphy.interface";

export class GifMapper {
    static mapGiphyItemToGif(item: Giphy): Gif {
        return {
            id: item.id,
            title: item.title,
            url: item.images.original.url,
        }
    }

    static mapGiphyItemsToGifArray(items: Giphy[]): Gif[] {
        return items.map(this.mapGiphyItemToGif);
    }
}