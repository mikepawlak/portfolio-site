import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleComponent } from './title.component';
import { EmploymentStatusService } from 'src/app/services/data/employment-status.service';

const fakeStatus = {
  id: 'foo',
  active: true,
  location: 'Milwaukee, WI',
  title: 'Software Engineer',
};

const employmentStatusServiceMock = {
  getFirstActiveStatus: jasmine
    .createSpy('getFirstActiveStatus')
    .and.returnValue(Promise.resolve(fakeStatus)),
};

describe('TitleComponent', () => {
  let fixture: ComponentFixture<TitleComponent>;
  let component: TitleComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleComponent],
      providers: [
        {
          provide: EmploymentStatusService,
          useValue: employmentStatusServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the current title from the service', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    expect(employmentStatusServiceMock.getFirstActiveStatus).toHaveBeenCalled();
  });
});
