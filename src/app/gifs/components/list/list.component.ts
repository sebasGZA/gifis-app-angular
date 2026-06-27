import { Component } from '@angular/core';
import { ListItemComponent } from "./list-item/list-item.component";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    imports: [ListItemComponent]
})

export class ListComponent {

}