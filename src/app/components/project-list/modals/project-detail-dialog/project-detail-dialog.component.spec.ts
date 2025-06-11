import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDetailDialogComponent } from './project-detail-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Project } from '../../project-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProjectTrackerComponent } from '../shared/project-tracker/project-tracker.component';

describe('ProjectDetailDialogComponent', () => {
  let component: ProjectDetailDialogComponent;
  let fixture: ComponentFixture<ProjectDetailDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ProjectDetailDialogComponent>>;

  const mockProjects: Project[] = [
    {
      title: 'Project A',
      banner: '',
      description: 'A desc',
      content: '',
      img: '',
    },
    {
      title: 'Project B',
      banner: '',
      description: 'B desc',
      content: '',
      img: '',
    },
    {
      title: 'Project C',
      banner: '',
      description: 'C desc',
      content: '',
      img: '',
    },
  ];

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ProjectDetailDialogComponent,
        NoopAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { project: mockProjects[1], projects: mockProjects },
        },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentIndex to match the passed project', () => {
    expect(component.currentIndex).toBe(1); // Project B
    expect(component.data.project.title).toBe('Project B');
  });

  it('should go to the next project when onNext is called', () => {
    component.onNext();
    fixture.detectChanges();
    expect(component.currentIndex).toBe(2);
    expect(component.data.project.title).toBe('Project C');
  });

  it('should not increment currentIndex past last project', () => {
    component.currentIndex = 2;
    component.onNext();
    expect(component.currentIndex).toBe(2);
  });

  it('should go to the previous project when onBack is called', () => {
    component.onBack();
    fixture.detectChanges();
    expect(component.currentIndex).toBe(0);
    expect(component.data.project.title).toBe('Project A');
  });

  it('should not decrement currentIndex below 0', () => {
    component.currentIndex = 0;
    component.onBack();
    expect(component.currentIndex).toBe(0);
  });

  it('should call close() on MatDialogRef when close() is called', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should correctly pass disable states to project-tracker', () => {
    // First project
    component.currentIndex = 0;
    fixture.detectChanges();
    let tracker = fixture.debugElement.query(
      By.directive(ProjectTrackerComponent)
    ).componentInstance;
    expect(tracker.disableBack).toBeTrue();
    expect(tracker.disableNext).toBeFalse();

    // Last project
    component.currentIndex = 2;
    fixture.detectChanges();
    tracker = fixture.debugElement.query(
      By.directive(ProjectTrackerComponent)
    ).componentInstance;
    expect(tracker.disableBack).toBeFalse();
    expect(tracker.disableNext).toBeTrue();
  });
});
