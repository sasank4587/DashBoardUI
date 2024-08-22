import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// import {MaterialExampleModule} from '../material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormDataComponent } from './form-data/form-data.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { invoiceReducer } from './store/invoice/invoice.reducer';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    FormDataComponent,
    AddInvoiceComponent,
    DashboardComponent
  ],
  imports: [
    AuthModule.forRoot({
      ...env.auth,
    }),
    StoreModule.forRoot({invoice : invoiceReducer}),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    CanvasJSAngularChartsModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
