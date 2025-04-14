import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendersComponent } from './attenders.component';

describe('AttendersComponent', () => {
  let component: AttendersComponent;
  let fixture: ComponentFixture<AttendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
