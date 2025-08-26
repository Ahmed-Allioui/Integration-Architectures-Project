import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {SocialPerformanceDTO} from '../dto/SociaPerformanceDTO';
import {Salesman} from '../models/Salesman';

@Injectable({
    providedIn: 'root'
})
export class SocialPerformanceService {

    constructor(private http: HttpClient) {
    }

    addSocialPerformance(sid: string, year: number, socialPerformance: SocialPerformanceDTO): Observable<Salesman> {
        // use angular's integrated HTTP-client to make a get request; handle the response as a User object :
        return this.http.post<Salesman>(environment.apiEndpoint + '/api/socialPerformance/year/' + year.toString() + '/salesman/' + sid,
            socialPerformance);
    }

    deleteSocialPerformance(sid: string, year: number, rid: string): Observable<Salesman> {
        console.log(sid, year, rid);
        return this.http.delete<Salesman>(environment.apiEndpoint + '/api/socialPerformance/'
            + rid + '/year/' + year.toString() + '/salesman/' + sid);
    }
}
