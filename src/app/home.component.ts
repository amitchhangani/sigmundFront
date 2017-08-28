import {
  Component, AfterViewInit, OnDestroy, ViewChild, ElementRef,
  Renderer, trigger, state, transition, style, animate
} from '@angular/core';
import { Routes } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import { CallanalysisComponent } from './callanalysis/callanalysis.component';
import { ReportComponent } from './report/report.component';

export const homeRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'setting', component: SettingsComponent },
  { path: 'call-anylsis', component: CallanalysisComponent },
  { path: 'report', component: ReportComponent },

  // { path: 'dashboard', component: DashboardComponent, children: dashboardRoutes, canActivate: [DashboardRouteGuard] },
  // {
  //   path: '',
  //   redirectTo: '/dashboard/statistics'
  // },
];

declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements AfterViewInit, OnDestroy {
  constructor() {}
  ngAfterViewInit() {}
  ngOnDestroy() {}
}
