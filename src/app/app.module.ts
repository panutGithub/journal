import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './_helpers';
import { HeaderComponent } from './header/header.component';
import { TitledetailService } from './_services/titledetail.service';
import { ProfileComponent } from './profile/profile.component';
import { DataTablesModule } from 'angular-datatables';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';
import { AlertService } from './_services';
import { PhonePipe } from './phone.pipe';
import { DownloadFileService } from './_services/download-file.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    ProfileComponent,
    AdminComponent,
    RegisterComponent,
    AlertComponent,
    PhonePipe,
  ],
  imports: [
    NgbModule, 
    FormsModule, 
    BrowserModule,
    NgbAlertModule, 
    DataTablesModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
    TitledetailService,
    AlertService,
    PhonePipe,
    DownloadFileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
