import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {SalesmanService} from '../../services/salesman.service';
import {Salesman} from '../../models/Salesman';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {RemoteService} from '../../services/remote.service';
import { RecordService } from 'src/app/services/record.service';
import {SalesmanALL} from '../../models/SalesmanALL';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class EmployeesComponent implements OnInit {

    inputValue: number;
    salesmen: Salesman[];
    years: number[];
    displayModal = false;
    isSubmitted = false;
    year: number;

    constructor(private appComponent: AppComponent, private route: ActivatedRoute, private salesmanService: SalesmanService,
                private remoteService: RemoteService, private router: Router,
                private messageService: MessageService, private recordService: RecordService) {
        this.appComponent.showMenu = true;
    }

    ngOnInit(): void {
        console.log('started');
        this.route.params.subscribe((params): void => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            this.year = params.year;
            console.log(this.year);
            this.fetchEmployeesLocal(this.year);
        });
    }

    submit(): void {
        if (!(this.inputValue < 1900 || this.inputValue > 3000)) {
            if (!this.years.includes(this.inputValue)) {
                this.fetchEmployeesRemote(this.inputValue);
            } else {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Cancelled',
                    detail: 'This year already exists in the dropdown'
                });
            }
        } else {
            this.messageService.add({severity: 'error', summary: 'Warning', detail: 'The given year is invalid'});
            this.isSubmitted = true;
        }
    }

    fetchEmployeesRemote(year: number): void {
        console.log('remote called', year);
        this.remoteService.importSalesmenByYear(year)
            .subscribe((): void => {
                this.navigateToSelectedYear(year);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Confirmed',
                    detail: 'The import is done!'
                });
                this.displayModal = false;
                this.isSubmitted = false;
            });
    }

    fetchEmployeesLocal(year: number): void {
        if (year){
            this.recordService.getSalesmenRecordsForYear(year)
                .subscribe((data): void => {
                    this.setData(data, year);
                });
        } else {
            this.recordService.getSalesmenRecordsLatest()
                .subscribe((data): void => {
                    this.setData(data, year);
                });
        }
    }

    setData(data: SalesmanALL, year: number): void{
        this.salesmen = data.salesmen;
        this.years = data.years;
        if (this.salesmen && this.salesmen.length > 0) {
            const salesman = this.salesmen[0];
            this.year = salesman.records[0].year;
        } else {
            this.year = year;
        }
    }

    goToCalculation(sid: string, year: number): void {
        void this.router.navigate([`bonuses/${sid}/${year}`]);
    }

    navigateToSelectedYear(year: number): void{
        void this.router.navigate([`employees/${year}`]);
        console.log('Hallo');
    }

    showModalDialog(): void {
        this.displayModal = true;
    }

    sumBonus(salesman: Salesman): string {
        return this.recordService.sumBonus(salesman);
    }
}
