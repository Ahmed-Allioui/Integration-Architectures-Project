import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppComponent} from '../../app.component';
import {Salesman} from '../../models/Salesman';
import {ActivatedRoute, Router} from '@angular/router';
import {RecordService} from '../../services/record.service';
import {Order} from '../../models/Order';
import {SocialPerformance} from '../../models/SocialPerformance';
import {YearId} from '../../models/YearId';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SocialPerformanceService} from '../../services/social-performance.service';
import {SocialPerformanceDTO} from '../../dto/SociaPerformanceDTO';

@Component({
    selector: 'app-bonuses',
    templateUrl: './bonuses.component.html',
    styleUrls: ['./bonuses.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class BonusesComponent implements OnInit {
    @Input()
        salesman: Salesman;
    @Input()
        isInputIdHidden = false;

    @Input()
        isInputRemarksDisabled = false;

    @Input()
        isAddSocialPerformanceHidden = false;

    @Output() search = new EventEmitter<YearId>();
    @Output() save = new EventEmitter<string>();
    @Output() generate = new EventEmitter<any>();
    @Output() validate = new EventEmitter<any>();
    @Output() reject = new EventEmitter<any>();

    @Output() send = new EventEmitter<any>();
    @Output() addSocialPerformance = new EventEmitter<SocialPerformanceDTO>();
    @Output() deleteSocialPerformance = new EventEmitter<string>();
    inputYear: number;
    inputId: string;
    sid: string;
    year: number;
    submitted = false;
    socialPerformanceDialog = false;

    socialPerformance: SocialPerformanceDTO = new SocialPerformanceDTO('', null, null);

    @Input()
        isGenerateButtonHidden = false;

    @Input()
        isSendButtonHidden = false;



    constructor(private appComponent: AppComponent, private activateRoute: ActivatedRoute,
                private recordService: RecordService, private socialPerformanceService: SocialPerformanceService,
                private messageService: MessageService, private confirmationService: ConfirmationService,
                private router: Router) {
        this.appComponent.showMenu = true;
    }

    ngOnInit(): void {
    }

    onSearch(): void {
        this.search.emit(new YearId(this.inputId, this.inputYear));
    }

    onGenerate(): void {
        this.generate.emit();
    }

    onValidate(): void {
        this.validate.emit();
    }

    onReject(): void {
        this.reject.emit();
    }

    onSave(): void {
        this.save.emit(this.salesman.records[0].remarks);
    }

    onSend(): void {
        this.send.emit();
    }

    onAddSocialPerformance(socialPerformance: SocialPerformanceDTO): void{
        this.submitted = true;
        this.addSocialPerformance.emit(socialPerformance);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Social Performance Created'});
        this.socialPerformanceDialog = false;
    }

    onDeleteSocialPerformance(rid: string): void{
        this.deleteSocialPerformance.emit(rid);
    }

    sumOrdersBonus(orders: Order[]): number {
        return this.recordService.sumOrdersBonus(orders);
    }

    sumSocialPerformanceBonus(socialPerformances: SocialPerformance[]): number {
        return this.recordService.sumSocialPerformanceBonus(socialPerformances);
    }

    sumAllBonuses(salesman: Salesman): string{
        return this.recordService.sumBonus(salesman);
    }

    openNew(): void {
        this.submitted = false;
        this.socialPerformanceDialog = true;
    }

    hideDialog(): void {
        this.socialPerformanceDialog = false;
        this.submitted = false;
    }

    deleteSelectedSocialPerformance(rid: string): void {
        this.socialPerformanceService.deleteSocialPerformance(this.sid, this.year, rid).subscribe();
    }

    saveSocialPerformance(socialPerformance: SocialPerformanceDTO): void {
        this.submitted = true;
        this.socialPerformanceService.addSocialPerformance(this.salesman.employeeId, this.salesman.records[0].year, socialPerformance)
            .subscribe();
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Social Performance Created'});
        this.socialPerformanceDialog = false;
    }
}
