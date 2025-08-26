import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {SalesmanALL} from '../models/SalesmanALL';

@Injectable({
    providedIn: 'root'
})
export class RemoteService {

    constructor(private http: HttpClient) { }

    importSalesmenByYear(year: number): Observable<SalesmanALL>{
        // use angular's integrated HTTP-client to make a get request; handle the response as a User object :
        return this.http.get<SalesmanALL>(environment.apiEndpoint + '/api/remote/salesman/year/' + year.toString(),
            {withCredentials: true});
    }
}
