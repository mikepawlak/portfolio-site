import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectTrackerComponent } from './project-tracker.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProjectTrackerComponent', () => {
  let component: ProjectTrackerComponent;
  let fixture: ComponentFixture<ProjectTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTrackerComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit back event when back button is clicked', () => {
    spyOn(component.back, 'emit');
    const backBtn = fixture.debugElement.queryAll(By.css('button'))[0]
      .nativeElement;
    backBtn.click();
    expect(component.back.emit).toHaveBeenCalled();
  });

  it('should emit next event when next button is clicked', () => {
    spyOn(component.next, 'emit');
    const nextBtn = fixture.debugElement.queryAll(By.css('button'))[1]
      .nativeElement;
    nextBtn.click();
    expect(component.next.emit).toHaveBeenCalled();
  });

  it('should disable back button when disableBack is true', () => {
    component.disableBack = true;
    fixture.detectChanges();
    const backBtn = fixture.debugElement.queryAll(By.css('button'))[0]
      .nativeElement;
    expect(backBtn.disabled).toBeTrue();
  });

  it('should disable next button when disableNext is true', () => {
    component.disableNext = true;
    fixture.detectChanges();
    const nextBtn = fixture.debugElement.queryAll(By.css('button'))[1]
      .nativeElement;
    expect(nextBtn.disabled).toBeTrue();
  });

  it('should not emit back when disabled', () => {
    component.disableBack = true;
    spyOn(component.back, 'emit');
    fixture.detectChanges();
    const backBtn = fixture.debugElement.queryAll(By.css('button'))[0]
      .nativeElement;
    backBtn.click();
    expect(component.back.emit).not.toHaveBeenCalled();
  });

  it('should not emit next when disabled', () => {
    component.disableNext = true;
    spyOn(component.next, 'emit');
    fixture.detectChanges();
    const nextBtn = fixture.debugElement.queryAll(By.css('button'))[1]
      .nativeElement;
    nextBtn.click();
    expect(component.next.emit).not.toHaveBeenCalled();
  });
});
