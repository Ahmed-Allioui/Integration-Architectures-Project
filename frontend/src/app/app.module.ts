import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WithCredentialsInterceptor } from './interceptor/with-credentials-interceptor';


import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {CheckboxModule} from 'primeng/checkbox';
import {RippleModule} from 'primeng/ripple';
import {ImageModule} from 'primeng/image';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MenuBarComponent} from './components/menu-bar/menu-bar.component';
import {TabMenuModule} from 'primeng/tabmenu';
import { BonusesComponent } from './pages/bonuses/bonuses.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {AvatarModule} from 'primeng/avatar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TagModule} from 'primeng/tag';
import { DetailsViewComponent } from './pages/details-view/details-view.component';
import { SalesmanProfileComponent } from './pages/salesman-profile/salesman-profile.component';
import {ToolbarModule} from 'primeng/toolbar';

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        LoginComponent,
        LandingPageComponent,
        NotFoundPageComponent,
        MenuBarComponent,
        BonusesComponent,
        EmployeesComponent,
        DetailsViewComponent,
        SalesmanProfileComponent
    ],
    imports: [
        BrowserModule,
        AppRouting,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        CheckboxModule,
        RippleModule,
        ImageModule,
        MessagesModule,
        MessageModule,
        TabMenuModule,
        ToastModule,
        DropdownModule,
        TableModule,
        ConfirmDialogModule,
        DialogModule,
        AvatarModule,
        InputTextareaModule,
        TagModule,
        ToolbarModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: WithCredentialsInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
