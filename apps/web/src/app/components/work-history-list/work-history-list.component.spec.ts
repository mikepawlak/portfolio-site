import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkHistoryListComponent } from './work-history-list.component';
import { WorkExperienceService } from 'src/app/services/data/work-experience.service';
import { Timestamp } from 'firebase/firestore';

class FakeWorkExperienceService {
  getAllExperiences = jasmine.createSpy().and.returnValue(
    Promise.resolve([
      {
        id: '1',
        company: 'TestCo',
        title: 'Engineer',
        location: 'Remote',
        description: 'Built things',
        startDate: Timestamp.fromDate(new Date('2023-01-01')),
        endDate: Timestamp.fromDate(new Date('2024-01-01')),
        skills: ['Angular'],
        highlights: ['Did cool stuff'],
      },
    ])
  );
}

describe('WorkHistoryListComponent', () => {
  let component: WorkHistoryListComponent;
  let fixture: ComponentFixture<WorkHistoryListComponent>;
  let mockService: FakeWorkExperienceService;

  beforeEach(async () => {
    mockService = new FakeWorkExperienceService();

    await TestBed.configureTestingModule({
      imports: [WorkHistoryListComponent],
      providers: [{ provide: WorkExperienceService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkHistoryListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch work experiences on init', async () => {
    await component.ngOnInit();

    expect(mockService.getAllExperiences).toHaveBeenCalled();
    expect(component.workExperiences.length).toBe(1);
    expect(component.loaded).toBeTrue();
  });
});
