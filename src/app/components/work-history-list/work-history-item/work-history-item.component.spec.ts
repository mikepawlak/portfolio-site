import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { WorkHistoryItemComponent } from './work-history-item.component';

describe('WorkHistoryItemComponent', () => {
  let component: WorkHistoryItemComponent;
  let fixture: ComponentFixture<WorkHistoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WorkHistoryItemComponent,
        NoopAnimationsModule, // disable real animations
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have expanded = false by default', () => {
    expect(component.expanded).toBeFalse();
  });

  it('should render "More" text and down icon initially', () => {
    const btnEl = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    expect(btnEl.textContent).toContain('More');

    const iconEl = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    expect(iconEl.getAttribute('ng-reflect-font-icon')).toBe('fa-angle-down');
  });

  it('should hide the <p> element initially', () => {
    const p = fixture.debugElement.query(By.css('mat-card-content p'));
    expect(p).toBeNull();
  });

  it('should expand on button click', () => {
    const buttonDe = fixture.debugElement.query(By.css('button'));
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.expanded).toBeTrue();

    const p = fixture.debugElement.query(By.css('mat-card-content p'));
    expect(p).not.toBeNull();

    const btnEl = buttonDe.nativeElement as HTMLButtonElement;
    expect(btnEl.textContent).toContain('Less');

    const iconEl = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    expect(iconEl.getAttribute('ng-reflect-font-icon')).toBe('fa-angle-up');
  });

  it('should collapse again on second click', fakeAsync(() => {
    // start expanded
    component.expanded = true;
    fixture.detectChanges();

    // click to collapse
    const buttonDe = fixture.debugElement.query(By.css('button'));
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    // wait for leave animation duration (200ms)
    tick(200);
    fixture.detectChanges();

    expect(component.expanded).toBeFalse();
    const p = fixture.debugElement.query(By.css('mat-card-content p'));
    expect(p).toBeNull();
  }));
});
