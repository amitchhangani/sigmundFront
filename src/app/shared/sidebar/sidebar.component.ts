import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';

@Component({
    moduleId: module.id,
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public toggleSide = false;
    ngOnInit() {

    }

}
