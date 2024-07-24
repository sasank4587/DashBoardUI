import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormDataComponent } from './form-data/form-data.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path : "" , redirectTo : "login", pathMatch : "full"},
  {path : "login", component : LoginComponent},
  {path : "form-data", component : FormDataComponent},
  {path : "add-invoice", component : AddInvoiceComponent},
  {path : "dashboard", component : DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
