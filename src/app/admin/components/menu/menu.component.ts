import { Component, OnInit } from '@angular/core';
import { childRoutes } from '../../child-routes';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {  
  routes = childRoutes;
  isExpanded = true;
  closedWidth = 90;
  openedWidth = 250;
  isMobile!: boolean;
  
  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }
}
