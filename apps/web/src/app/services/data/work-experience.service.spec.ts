import { TestBed } from '@angular/core/testing';
import {
  WorkExperienceService,
  WorkExperience,
} from './work-experience.service';
import { FirestoreWrapper } from './firestore.service';
import { Timestamp } from 'firebase/firestore';

class FakeFirestoreWrapper {
  public getOrderedDocuments = jasmine.createSpy('getOrderedDocuments');
}

describe('WorkExperienceService', () => {
  let service: WorkExperienceService;
  let wrapper: FakeFirestoreWrapper;

  beforeEach(() => {
    wrapper = new FakeFirestoreWrapper();

    TestBed.configureTestingModule({
      providers: [
        WorkExperienceService,
        { provide: FirestoreWrapper, useValue: wrapper },
      ],
    });

    service = TestBed.inject(WorkExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllExperiences() should call wrapper.getOrderedDocuments with correct args and return data', async () => {
    const mockData: WorkExperience[] = [
      {
        id: 'abc123',
        company: 'Octane',
        title: 'Senior Dev',
        location: 'Remote',
        description: 'Did cool stuff',
        startDate: Timestamp.fromDate(new Date('2023-01-01')),
        endDate: Timestamp.fromDate(new Date('2024-01-01')),
        skills: ['Angular', 'NestJS'],
        highlights: ['Built a CI/CD pipeline'],
      },
    ];

    wrapper.getOrderedDocuments.and.returnValue(Promise.resolve(mockData));

    const result = await service.getAllExperiences();

    expect(result).toEqual(mockData);
    expect(wrapper.getOrderedDocuments).toHaveBeenCalledOnceWith(
      'workExperiences',
      'startDate',
      'desc'
    );
  });

  it('getAllExperiences() should propagate errors from wrapper.getOrderedDocuments', async () => {
    const error = new Error('Firestore failed');
    wrapper.getOrderedDocuments.and.returnValue(Promise.reject(error));

    await expectAsync(service.getAllExperiences()).toBeRejectedWith(error);
  });
});
