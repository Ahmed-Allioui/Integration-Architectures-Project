import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

    isLoggedIn: boolean;
    showMenu: boolean;

    constructor(private authService: AuthService) {
        this.showMenu = true;
    }

    ngOnInit(): void {
        this.authService.subscribeLoginChange((newState: boolean): void => {this.isLoggedIn = newState; });
        this.authService.isLoggedIn().subscribe();
    }
}
