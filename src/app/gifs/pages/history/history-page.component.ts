import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs';

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history-page.component.html',
})
export default class HistoryPageComponent {
  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(param => param['query'])
    )
  )
}
