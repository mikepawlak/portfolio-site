import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

import { ContactFormComponent } from './contact-form.component';
import {
  ContactFormService,
  ContactFormValue,
} from 'src/app/services/form/contact-form.service';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let service: ContactFormService;
  let alertSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ContactFormService);
    alertSpy = spyOn(window, 'alert');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and subtitle', () => {
    const title = fixture.debugElement.query(
      By.css('mat-card-title')
    ).nativeElement;
    expect(title.textContent).toContain('Get In Touch!');

    const subtitle = fixture.debugElement.query(
      By.css('mat-card-subtitle')
    ).nativeElement;
    expect(subtitle.textContent).toContain('Lorem ipsum dolor sit amet');
  });

  it('should disable Send button initially', () => {
    const btn = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    expect(btn.disabled).toBeTrue();
  });

  it('should enable Send button when form is valid', () => {
    // fill form with valid values
    const valid: ContactFormValue = {
      name: 'Bob',
      email: 'bob@example.com',
      company: 'Acme',
      message: 'Hello',
    };
    service.form.setValue(valid);
    service.form.markAsDirty();
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    expect(btn.disabled).toBeFalse();
  });

  it('should show email required error when touched and empty', () => {
    const emailCtrl = service.form.get('email')!;
    emailCtrl.markAsTouched();
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css('mat-error'));
    expect(errors.length).toBe(1);
    expect(errors[0].nativeElement.textContent.trim()).toBe(
      'Email is required'
    );
  });

  it('should call success alert on valid submit', () => {
    spyOn(service, 'submit').and.returnValue(of({} as ContactFormValue));
    service.form.setValue({
      name: 'Alice',
      email: 'alice@example.com',
      company: 'ExampleCo',
      message: 'Hi',
    });
    fixture.detectChanges();

    component.onSubmit();

    expect(service.submit).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Message sent!');
  });

  it('should re-disable Send button after successful submit & reset', () => {
    const valid: ContactFormValue = {
      name: 'Alice',
      email: 'alice@example.com',
      company: 'ExampleCo',
      message: 'Hi',
    };

    spyOn(service, 'submit').and.callFake(() => {
      service.resetForm();
      return of(valid);
    });

    service.form.setValue(valid);
    service.form.markAsDirty();
    fixture.detectChanges();
    let btn = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    expect(btn.disabled).toBeFalse();

    component.onSubmit();
    fixture.detectChanges();

    btn = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    expect(btn.disabled).toBeTrue();
  });

  it('should call error alert on failed submit', () => {
    spyOn(service, 'submit').and.returnValue(
      throwError(() => new Error('fail'))
    );
    // form must be valid to trigger subscribe error path
    service.form.setValue({
      name: 'Alice',
      email: 'alice@example.com',
      company: 'ExampleCo',
      message: 'Hi',
    });
    fixture.detectChanges();

    component.onSubmit();

    expect(service.submit).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Please fix errors and try again.');
  });
});
