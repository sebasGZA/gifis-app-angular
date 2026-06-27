import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";

@Component({
  selector: 'app-dashboard-pages',
  templateUrl: './dashboard-page.component.html',
  imports: [
    RouterOutlet,
    SideMenuComponent,
  ],
})
export default class DashboardPageComponent { }
