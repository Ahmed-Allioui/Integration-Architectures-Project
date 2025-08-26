import {Component, OnInit} from '@angular/core';
import {RecordService} from '../../services/record.service';
import {Salesman} from '../../models/Salesman';
import {ActivatedRoute, Router} from '@angular/router';
import {YearId} from '../../models/YearId';
import {BonusService} from '../../services/bonus.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {SocialPerformanceDTO} from '../../dto/SociaPerformanceDTO';
import {SocialPerformanceService} from '../../services/social-performance.service';

@Component({
    selector: 'app-details-view',
    templateUrl: './details-view.component.html',
    styleUrls: ['./details-view.component.scss']
})
export class DetailsViewComponent implements OnInit {

    salesman: Salesman;
    sid: string;
    year: number;
    currentUser: User;
    isCeo = false;
    isHR = false;


    constructor(private recordService: RecordService, private router: Router,
                private activateRoute: ActivatedRoute, private bonusService: BonusService
                , private userService: UserService, private socialPerformanceService: SocialPerformanceService) {
    }

    ngOnInit(): void {
        this.activateRoute.params.subscribe((params): void => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            this.sid = params.sid;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            this.year = params.year;
            this.getSalesmanRecords(this.sid, this.year);
        });
        this.userService.getCurrentUser().subscribe((user): void => {
            this.currentUser = user;
            console.log(this.currentUser);
            this.isCeo = (this.currentUser.role === 'CEO');
            this.isHR = (this.currentUser.role === 'HR');
            console.log('I am the logged in User', this.currentUser);
        });
    }

    getSalesmanRecords(sid: string, year: number): void {
        this.recordService.getSalesmanRecords(sid, year).subscribe(
            (data): void => {
                this.salesman = data;
                console.log(this.salesman);
            }
        );
    }

    onSearch($event: YearId): void {
        console.log('search:', $event);
        void this.router.navigate([`bonuses/${$event.id}/${$event.year}`]);
    }

    onSave($event: string): void {
        console.log('save:', $event);
        this.recordService.saveRemarks($event, this.sid, this.year).subscribe();
    }

    onGenerate(): void {
        console.log('generate', this.sid, 'and', this.year);
        this.bonusService.generateBonusForSalesman(this.sid, this.year)
            .subscribe((salesman): Salesman => this.salesman = salesman);
    }

    onValidate(): void {
        console.log('validate', this.sid, 'and', this.year);
        this.bonusService.validateBonusForSalesman(this.sid, this.year)
            .subscribe((salesman): Salesman => this.salesman = salesman);
    }

    onReject(): void {
        console.log('reject', this.sid, 'and', this.year);
        this.bonusService.rejectBonusesForSalesman(this.sid, this.year)
            .subscribe((salesman): Salesman => this.salesman = salesman);
    }

    onSend(): void {
        console.log('send', this.sid, 'and', this.year);
        this.bonusService.sendBonusToOrangeHRM(this.sid, this.year).subscribe();
    }

    onAddSocialPerformance($event: SocialPerformanceDTO): void {
        this.socialPerformanceService.addSocialPerformance(this.salesman.employeeId, this.salesman.records[0].year, $event)
            .subscribe((salesman): Salesman => this.salesman = salesman);
    }

    onDeleteSocialPerformance($event: string): void {
        this.socialPerformanceService.deleteSocialPerformance(this.sid, this.year, $event)
            .subscribe((salesman): Salesman => this.salesman = salesman);
    }
}
