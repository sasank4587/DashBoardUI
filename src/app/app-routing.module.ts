import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormDataComponent } from './form-data/form-data.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {path : "" , redirectTo : "dashboard", pathMatch : "full"},
  // {path : "login", component : LoginComponent},
  {path : "form-data", component : FormDataComponent, canActivate: [AuthGuard] },
  {path : "add-invoice", component : AddInvoiceComponent, canActivate: [AuthGuard] },
  {path : "dashboard", component : DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
