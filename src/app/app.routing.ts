import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent, homeRoutes} from './home.component';
import {SettingsComponent} from './settings/settings.component';
import {RouteGuard} from './shared/route-guards/route.guard';
const appRoutes: Routes = [
   { path: '', component: HomeComponent, children: homeRoutes, canActivate: [RouteGuard]},
  { path: 'setting', component: SettingsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
