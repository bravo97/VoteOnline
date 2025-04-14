import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallotdialogComponent } from './ballotdialog.component';

describe('BallotdialogComponent', () => {
  let component: BallotdialogComponent;
  let fixture: ComponentFixture<BallotdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BallotdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BallotdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
