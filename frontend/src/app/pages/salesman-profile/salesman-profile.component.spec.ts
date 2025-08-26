import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmanProfileComponent } from './salesman-profile.component';

describe('SalesmanProfileComponent', () => {
  let component: SalesmanProfileComponent;
  let fixture: ComponentFixture<SalesmanProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesmanProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesmanProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
