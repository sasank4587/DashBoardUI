import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormDataComponent } from './form-data/form-data.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MeatComponent } from './meat/meat.component';
import { VegetablesComponent } from './vegetables/vegetables.component';
import { GroceryComponent } from './grocery/grocery.component';


import { BrowserUtils } from '@azure/msal-browser';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path : "form-data", component : FormDataComponent, canActivate: [MsalGuard] },
  {path : "add-invoice", component : AddInvoiceComponent, canActivate: [MsalGuard] },
  {path : "dashboard", component : DashboardComponent, canActivate: [MsalGuard] },
  {path : "meat", component : MeatComponent, canActivate: [MsalGuard] },
  {path : "veg", component : VegetablesComponent, canActivate: [MsalGuard] },
  {path : "grocery", component : GroceryComponent, canActivate: [MsalGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


/* auth 0
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {path : "" , component : HomeComponent,},
  // {path : "login", component : LoginComponent},
  {path : "form-data", component : FormDataComponent, canActivate: [AuthGuard] },
  {path : "add-invoice", component : AddInvoiceComponent, canActivate: [AuthGuard] },
  {path : "dashboard", component : DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

*/


export class AppRoutingModule { }
