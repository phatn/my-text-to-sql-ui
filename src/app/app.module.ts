import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from "./layout/layout.module";
import {LoginComponent} from './login/login.component';
import {MaterialModule} from "./material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {UserService} from "./login/user.service";
import {AttachTokenInterceptor} from './attach-token.interceptor';
import {DataSearchComponent} from './data-search/data-search.component';
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DataSearchComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        UserService,
        {provide: HTTP_INTERCEPTORS, useClass: AttachTokenInterceptor, multi: true}
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
