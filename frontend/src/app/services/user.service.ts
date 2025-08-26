import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

/**
 * handles backend communication regarding user accounts
 */
@Injectable({
    providedIn: 'root'
})
export class UserService {

    user: User;

    constructor(private http: HttpClient) {
    }

    getCurrentUser(): Observable<User> {
        return new Observable<User>((observer): void => {
            if (this.user) {
                observer.next(this.user);
            } else {
                this.setCurrentUser().subscribe(
                    (): void => {
                        observer.next(this.user);
                        observer.complete();
                    },
                    (error): void => {
                        console.error(error);
                        observer.next(null);
                        observer.complete();
                    }
                );
            }
        });
    }

    setCurrentUser(): Observable<boolean> {
        return new Observable<boolean>((observer): void => {
            this.getOwnUser().subscribe(
                (user): void => {
                    this.user = user;
                    observer.next(true);
                    observer.complete();
                },
                (error): void => {
                    console.error(error);
                    observer.next(false);
                    observer.complete();
                }
            );
        });
    }

    unsetCurrentUser(): void{
        this.user = null;
    }

    /**
     * retrieves userdata of currently authenticated user
     */
    getOwnUser(): Observable<User> {
        // use angular's integrated HTTP-client to make a get request; handle the response as a User object :
        return this.http.get<User>(environment.apiEndpoint + '/api/user');
    }
}
