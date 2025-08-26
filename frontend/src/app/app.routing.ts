import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {AuthGuardService} from './services/auth-guard.service';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {EmployeesComponent} from './pages/employees/employees.component';
import {DetailsViewComponent} from './pages/details-view/details-view.component';
import {SalesmanProfileComponent} from './pages/salesman-profile/salesman-profile.component';

/*
  This array holds the relation of paths and components which angular router should resolve.

  If you want add a new page with a separate path/subdirectory you should register it here.
  It is also possible to read parameters from the path they have to be specified with ':' in the path.

  If a new page should also show up in the menu bar, you need to add it there too.
  Look at: frontend/src/app/components/menu-bar/menu-bar.component.ts
 */
const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
    {path: '', component: LandingPageComponent, canActivate: [AuthGuardService]},
    {path: 'home', component: LandingPageComponent, canActivate: [AuthGuardService]},
    {path: 'bonuses/:sid/:year', component: DetailsViewComponent, canActivate: [AuthGuardService]},
    {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuardService]},
    {path: 'bonus/me/:year', component: SalesmanProfileComponent, canActivate: [AuthGuardService]},
    {path: 'bonus/me', component: SalesmanProfileComponent, canActivate: [AuthGuardService]},
    {path: 'employees/:year', component: EmployeesComponent, canActivate: [AuthGuardService]},
    {path: '**', component: NotFoundPageComponent} // these entries are matched from top to bottom => not found should be the last entry
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting {
}
