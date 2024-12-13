import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import {DataSearchComponent} from "./data-search/data-search.component";
import {CheckAdminGuard} from "./check-admin-guard";

const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: "full"},
  { path: 'login', component: LoginComponent},
  { path: 'data-search', component: DataSearchComponent, canActivate: [CheckAdminGuard]},
  { path: '**', redirectTo: "login"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
