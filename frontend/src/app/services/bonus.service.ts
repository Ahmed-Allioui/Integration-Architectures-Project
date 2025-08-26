import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Salesman} from '../models/Salesman';

@Injectable({
    providedIn: 'root'
})
export class BonusService {

    constructor(private http: HttpClient) {
    }

    generateBonusForSalesman(sid: string, year: number): Observable<Salesman> {
        // use angular's integrated HTTP-client to make a get request; handle the response as a User object :
        return this.http.get<Salesman>(environment.apiEndpoint + '/api/bonus/year/' + year.toString() + '/salesman/' + sid + '/generate');
    }

    sendBonusToOrangeHRM(sid: string, year: number): Observable<any> {
        // use angular's integrated HTTP-client to make a get request; handle the response as a User object :
        return this.http.get<any>(environment.apiEndpoint + '/api/bonus/year/' + year.toString() + '/salesman/' + sid + '/send');
    }

    validateBonusForSalesman(sid: string, year: number): Observable<Salesman> {
        return this.http.get<Salesman>(environment.apiEndpoint + '/api/bonus/year/' + year.toString() + '/salesman/' + sid + '/validate');
    }

    validateCurrentSalesmanBonus(year: number): Observable<Salesman> {
        return this.http.get<Salesman>(environment.apiEndpoint + '/api/bonus/year/' + year.toString() + '/validate');
    }

    rejectBonusesForSalesman(sid: string, year: number): Observable<Salesman> {
        return this.http.delete<Salesman>(environment.apiEndpoint + '/api/bonus/year/' + year.toString() + '/salesman/'
            + sid + '/validate');
    }

    rejectCurrentSalesmanBonuses(year: number): Observable<Salesman> {
        return this.http.delete<Salesman>(environment.apiEndpoint + '/api/bonus/year/' + year.toString() + '/validate');
    }
}
