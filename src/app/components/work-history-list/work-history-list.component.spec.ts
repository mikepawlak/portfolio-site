import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkHistoryListComponent } from './work-history-list.component';

describe('WorkHistoryListComponent', () => {
  let component: WorkHistoryListComponent;
  let fixture: ComponentFixture<WorkHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkHistoryListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
