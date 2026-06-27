import { Component, inject } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending-page.component.html',
  imports: [ListComponent],
})
export default class TrendingPageComponent {
  gifsService = inject(GifService);
}
