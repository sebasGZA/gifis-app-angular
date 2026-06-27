import { Component } from '@angular/core';
import { SideMenuOptionsComponent } from "./side-menu-options/side-menu-options.component";
import { SideMenuHeaderComponent } from "./side-menu-header/side-menu-header.component";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  imports: [SideMenuOptionsComponent, SideMenuHeaderComponent],
})
export class SideMenuComponent {}
