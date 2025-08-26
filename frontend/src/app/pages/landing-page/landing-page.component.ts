import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
    user: User;

    constructor(private appComponent: AppComponent, private userService: UserService) {
        this.appComponent.showMenu = true;
    }

    ngOnInit(): void {
        this.fetchUser();
    }

    fetchUser(): void{
        this.userService.getCurrentUser().subscribe((user): User => this.user = user);
    }

}
