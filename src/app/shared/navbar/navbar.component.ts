import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    router: any;
    constructor(location: Location, private _router: Router) {
        this.location = location;
        this.router = _router;
    }
    ngOnInit() {
        // this.listTitles = ROUTES.filter(listTitle => listTitle);
    }
    getTitle() {
        let titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice( 2 );
        }
        for (let item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
    goTo () {
        this.router.navigate(['../login']);
    }
}
