import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs';

import { GifService } from '../../services/gifs.service';
import { ListComponent } from "../../components/list/list.component";

@Component({
  selector: 'app-history',
  imports: [ListComponent],
  templateUrl: './history-page.component.html',
})
export default class HistoryPageComponent {

  gifsService = inject(GifService)

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(param => param['query'])
    )
  )

  gifsByHistory = computed(() => this.gifsService.getHistoryGifs(this.query()))
}
