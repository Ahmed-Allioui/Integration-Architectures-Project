import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'app-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

    user: User;
    items: MenuItem[];
    itemsSalesman: MenuItem[];

    activeItem: MenuItem;
    activeItemSalesman: MenuItem;
    isSalesman = false;

    /**
     * The following parameters specify objects, which will be provided by dependency injection
     *
     * @param authService
     * @param router
     * @param userService
     */
    constructor(private authService: AuthService, private router: Router, private userService: UserService) {
    }

    ngOnInit(): void {
        this.fetchUser();
        this.items = [
            {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: 'home'},
            {label: 'Employees', icon: 'pi pi-fw pi-users', routerLink: 'employees'},
            {label: 'Log out', icon: 'pi pi-fw pi-sign-out', command: (): void => this.handleLogout()}
        ];

        this.itemsSalesman = [
            {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: 'home'},
            {label: 'My Profile', icon: 'pi pi-fw pi-user', routerLink: 'bonus/me'},
            {label: 'Log out', icon: 'pi pi-fw pi-sign-out', command: (): void => this.handleLogout()}
        ];
        this.activeItem = this.items[0];
        this.activeItemSalesman = this.itemsSalesman[0];
    }

    /**
     * function which handles clicking the logout button
     */
    handleLogout(): void {
        this.authService.logout().subscribe();
        void this.router.navigate(['login']); // after logout go back to the login-page
    }

    /**
     * fetches information about logged-in user
     */
    fetchUser(): void {
        this.userService.getCurrentUser().subscribe((user): void => {
            this.user = user;
            this.isSalesman = (this.user.role === 'Salesman');
        },
        (error): void => console.log(error));
    }
}
