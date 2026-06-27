import { Component, input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
})
export class ListItemComponent {
  url = input.required<string>()
}
