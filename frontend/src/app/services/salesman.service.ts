import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Salesman} from '../models/Salesman';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SalesmanService {

    constructor(private http: HttpClient) { }

    getAllSalesmen(): Observable<Salesman[]>{
        // use angular's integrated HTTP-client to make a get request; handle the response as a User object :
        return this.http.get<Salesman[]>(environment.apiEndpoint + '/api/salesman');
    }

    getSalesmanById(id: string): Observable<Salesman>{
        // use angular's integrated HTTP-client to make a get request; handle the response as a User object :
        return this.http.get<Salesman>(environment.apiEndpoint + '/api/salesman/' + id);
    }
}
