import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDetailSheetComponent } from './project-detail-sheet.component';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ProjectTrackerComponent } from '../shared/project-tracker/project-tracker.component';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Project } from '../../project-list.component';

describe('ProjectDetailSheetComponent', () => {
  let component: ProjectDetailSheetComponent;
  let fixture: ComponentFixture<ProjectDetailSheetComponent>;
  let bottomSheetRefSpy: jasmine.SpyObj<
    MatBottomSheetRef<ProjectDetailSheetComponent>
  >;

  const mockProjects: Project[] = [
    {
      title: 'Project A',
      banner: '',
      description: 'Desc A',
      content: '',
      img: '',
    },
    {
      title: 'Project B',
      banner: '',
      description: 'Desc B',
      content: '',
      img: '',
    },
    {
      title: 'Project C',
      banner: '',
      description: 'Desc C',
      content: '',
      img: '',
    },
  ];

  beforeEach(async () => {
    bottomSheetRefSpy = jasmine.createSpyObj('MatBottomSheetRef', ['dismiss']);

    await TestBed.configureTestingModule({
      imports: [
        ProjectDetailSheetComponent,
        NoopAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
      ],
      providers: [
        {
          provide: MAT_BOTTOM_SHEET_DATA,
          useValue: { project: mockProjects[1], projects: mockProjects },
        },
        { provide: MatBottomSheetRef, useValue: bottomSheetRefSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct current index', () => {
    expect(component.currentIndex).toBe(1); // index of Project B
    expect(component.data.project.title).toBe('Project B');
  });

  it('should go to next project on onNext()', () => {
    component.onNext();
    fixture.detectChanges();
    expect(component.currentIndex).toBe(2);
    expect(component.data.project.title).toBe('Project C');
  });

  it('should not go past last project on onNext()', () => {
    component.currentIndex = 2; // last index
    component.onNext();
    expect(component.currentIndex).toBe(2); // still last
  });

  it('should go to previous project on onBack()', () => {
    component.onBack();
    fixture.detectChanges();
    expect(component.currentIndex).toBe(0);
    expect(component.data.project.title).toBe('Project A');
  });

  it('should not go before first project on onBack()', () => {
    component.currentIndex = 0;
    component.onBack();
    expect(component.currentIndex).toBe(0);
  });

  it('should close the sheet when close() is called', () => {
    component.close();
    expect(bottomSheetRefSpy.dismiss).toHaveBeenCalled();
  });

  it('should disable back button on first project and next on last', () => {
    // First
    component.currentIndex = 0;
    fixture.detectChanges();
    let tracker = fixture.debugElement.query(
      By.directive(ProjectTrackerComponent)
    ).componentInstance;
    expect(tracker.disableBack).toBeTrue();
    expect(tracker.disableNext).toBeFalse();

    // Last
    component.currentIndex = 2;
    fixture.detectChanges();
    tracker = fixture.debugElement.query(
      By.directive(ProjectTrackerComponent)
    ).componentInstance;
    expect(tracker.disableBack).toBeFalse();
    expect(tracker.disableNext).toBeTrue();
  });
});
