import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TagInputModule } from 'ngx-chips';
import { TagCloudModule } from 'angular-tag-cloud-module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { routing } from './app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdCoreModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SettingsComponent } from './settings/settings.component';
import { CdkTableModule } from '@angular/cdk';
import { CallanalysisComponent } from './callanalysis/callanalysis.component';
import { SlidebarComponent } from './component/slidebar/slidebar.component';
import { EmotionGraphComponent } from './component/emotion-graph/emotion-graph.component';
import { HeatMapComponent } from './component/heat-map/heat-map.component';
import { ReportComponent } from './report/report.component';
import { HttpModule } from '@angular/http';
import { ChatLineComponent } from './component/chatline/chatline';
import { RouteGuard } from './shared/route-guards/route.guard';
import { SocketService } from './shared/socket/socket.service';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { RoundPipe } from './callanalysis/round-Pipe';
import { PatientComponent } from './patient/patient.component';
import { PatientAddComponent } from './patient/patient-add.component';
import { PatientUpdateComponent } from './patient/patient-update.component';
import { UserPatientComponent } from './user-patient/user-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SettingsComponent,
    CallanalysisComponent,
    HeatMapComponent,
    EmotionGraphComponent,
    SlidebarComponent,
    ReportComponent,
    ChatLineComponent,
    FileDropDirective, FileSelectDirective, RoundPipe, PatientComponent, PatientAddComponent, PatientUpdateComponent, UserPatientComponent
  ],
  imports: [
    BrowserModule,
    routing,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    CdkTableModule,
    TagInputModule,
    TagCloudModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [RouteGuard, SocketService],
  bootstrap: [AppComponent],
  exports: [FileDropDirective, FileSelectDirective]
})
export class AppModule {
}
