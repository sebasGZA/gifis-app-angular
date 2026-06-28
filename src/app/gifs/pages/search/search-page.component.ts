import { Component, inject, signal } from '@angular/core';

import { ListComponent } from "../../components/list/list.component";
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  imports: [ListComponent],
})
export default class SearchPageComponent {
  gifsService = inject(GifService)
  gifs = signal<Gif[]>([])

  onSearch(query: string) {
    if (query && query.length > 3)
      this.gifsService.searchQueryGifs(query).subscribe((data) => {
        this.gifs.set(data)
      })
  }
}
