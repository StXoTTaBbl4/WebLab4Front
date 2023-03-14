import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, NgForm} from '@angular/forms';

import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./mainComponent/main.component";
import {AuthComponent} from "./authComponent/auth.component";
import {RegComponent} from "./regComponent/reg.component";

const  appRoute: Routes = [
  // {path:'', redirectTo: 'Authorization', pathMatch:'full'},
  {path:'main',component: MainComponent},
  {path:'auth', component: AuthComponent},
  {path:'reg', component: RegComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthComponent,
    RegComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
