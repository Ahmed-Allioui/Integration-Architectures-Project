import {Component, OnInit} from '@angular/core';
import {Salesman} from '../../models/Salesman';
import {RecordService} from '../../services/record.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BonusService} from '../../services/bonus.service';
import {UserService} from '../../services/user.service';
import {YearId} from '../../models/YearId';

@Component({
    selector: 'app-salesman-profile',
    templateUrl: './salesman-profile.component.html',
    styleUrls: ['./salesman-profile.component.scss']
})
export class SalesmanProfileComponent implements OnInit{
    salesman: Salesman;
    year: number;


    constructor(private recordService: RecordService, private router: Router,
                private activateRoute: ActivatedRoute, private bonusService: BonusService
                , private userService: UserService) {
    }

    ngOnInit(): void {
        this.activateRoute.params.subscribe((params): void => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            this.year = params.year;
            if (this.year){
                this.getCurrentSalesmanRecords(this.year);
            } else {
                this.getLatestCurrentSalesmanRecords();
            }
        });
    }
    getCurrentSalesmanRecords(year: number): void {
        this.recordService.getCurrentSalesmanRecords(year).subscribe(
            (data): void => {
                this.salesman = data;
            }
        );
    }

    getLatestCurrentSalesmanRecords(): void {
        this.recordService.getLatestCurrentSalesmanRecords().subscribe(
            (data): void => {
                this.salesman = data;
            }
        );
    }

    onSearch($event: YearId): void {
        void this.router.navigate([`bonus/me/${$event.year}`]);
    }

    onSave($event: string): void {
        // DO NOTHING :)
    }

    onGenerate(): void {
        // DO NOTHING :)
    }

    onValidate(): void {
        this.bonusService.validateCurrentSalesmanBonus(this.year)
            .subscribe((salesman): Salesman => this.salesman = salesman);
    }

    onReject(): void {
        this.bonusService.rejectCurrentSalesmanBonuses(this.year)
            .subscribe((salesman): Salesman => this.salesman = salesman);
    }

    onSend(): void {
        // DO NOTHING :)
    }
}
