import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Record} from '../models/Record';
import {environment} from '../../../environments/environment';
import {Salesman} from '../models/Salesman';
import {SalesmanALL} from '../models/SalesmanALL';
import {Order} from '../models/Order';
import {SocialPerformance} from '../models/SocialPerformance';
import {Remarks} from '../models/Remarks';

@Injectable({
    providedIn: 'root'
})
export class RecordService {

    constructor(private http: HttpClient) {
    }

    getCurrentSalesmanRecords(year: number): Observable<Salesman> {
        // use angular's integrated HTTP-client to make a get request; handle the response as a User object :
        return this.http.get<Salesman>(environment.apiEndpoint + '/api/record/year/' + year.toString() + '/me');
    }

    getLatestCurrentSalesmanRecords(): Observable<Salesman> {
        // use angular's integrated HTTP-client to make a get request; handle the response as a User object :
        return this.http.get<Salesman>(environment.apiEndpoint + '/api/record/latest/me');
    }


    getSalesmanRecords(id: string, year: number): Observable<Salesman> {
        // use angular's integrated HTTP-client to make a get request; handle the response as a User object :
        return this.http.get<Salesman>(environment.apiEndpoint + '/api/record/year/' + year.toString() + '/salesman/' + id);
    }

    getSalesmenRecordsForYear(year: number): Observable<SalesmanALL> {
        // use angular's integrated HTTP-client to make a get request; handle the response as a User object :
        return this.http.get<SalesmanALL>(environment.apiEndpoint + '/api/record/year/' + year.toString());
    }

    getSalesmenRecordsLatest(): Observable<SalesmanALL> {
        // use angular's integrated HTTP-client to make a get request; handle the response as a User object :
        return this.http.get<SalesmanALL>(environment.apiEndpoint + '/api/record/latest');
    }

    getYears(): Observable<Record[]> {
        // use angular's integrated HTTP-client to make a get request; handle the response as a User object :
        return this.http.get<Record[]>(environment.apiEndpoint + '/api/record/years');
    }
    saveRemarks(remarks: string, id: string, year: number): Observable<any> {
        return this.http.post<any>(environment.apiEndpoint + '/api/record/year/' + year.toString() + '/salesman/' + id + '/saveRemarks',
            new Remarks(remarks));
    }
    sumOrdersBonus(orders: Order[]): number {
        if (!orders || orders.length < 1){
            return null;
        }
        let sum = 0;
        for (const order of orders) {
            if (!order.bonus){
                return null;
            }
            sum += order.bonus;
        }
        return sum;
    }

    sumSocialPerformanceBonus(socialPerformances: SocialPerformance[]): number {
        if (!socialPerformances || socialPerformances.length < 1){
            return null;
        }
        let sum = 0;
        for (const socialPerformance of socialPerformances) {
            if (!socialPerformance.bonus){
                return null;
            }
            sum += socialPerformance.bonus;
        }
        return sum;
    }

    sumBonus(salesman: Salesman): string {
        const errorMsg = 'Bonus not yet generated!';
        if (!salesman || !salesman.records || salesman.records.length < 1){
            return errorMsg;
        }
        const record = salesman.records[0];
        const ordersBonuses = this.sumOrdersBonus(record.orders);
        const socialPerformancesBonuses = this.sumSocialPerformanceBonus(record.socialPerformances);
        if (!ordersBonuses || !socialPerformancesBonuses){
            return errorMsg;
        }
        return (ordersBonuses + socialPerformancesBonuses).toString() + ' €';
    }
}
