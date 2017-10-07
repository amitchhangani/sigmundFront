import {Component} from '@angular/core';
import { Routes } from '@angular/router';
import { ShowTranscriptionComponent } from './user-patient/show-transcription.component';
import { PatientTranscriptionComponent } from './patient/patient-transcription.component';
import { UserUpdateComponent } from './user/user-update.component';
import { UserAddComponent } from './user/user-add.component';
import { UserComponent } from './user/user.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import { CallanalysisComponent } from './callanalysis/callanalysis.component';
import { ReportComponent } from './report/report.component';
import { PatientComponent} from './../app/patient/patient.component';
import { PatientUpdateComponent} from './../app/patient/patient-update.component';
import { PatientAddComponent} from './../app/patient/patient-add.component';
import { UserPatientComponent} from './../app/user-patient/user-patient.component';

export const homeRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'call-anylsis', component: CallanalysisComponent },
  { path: 'report', component: ReportComponent },
  { path: 'setting', component: SettingsComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'patient_add', component: PatientAddComponent },
  { path: 'patient_update', component: PatientUpdateComponent },
  { path: 'therapist', component: UserComponent },
  { path: 'therapist_add', component: UserAddComponent },
  { path: 'therapist_update', component: UserUpdateComponent },
  { path: 'user_patient', component: UserPatientComponent},
  { path: 'patient_transcription', component : PatientTranscriptionComponent },
  { path: 'patient_id_transcription', component : ShowTranscriptionComponent }
  // { path: 'dashboard', component: DashboardComponent, children: dashboardRoutes, canActivate: [DashboardRouteGuard] },
  // {
  //   path: '',
  //   redirectTo: '/dashboard/statistics'
  // },
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
}
