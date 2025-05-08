import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ContactFormComponent } from './contact-form.component';
import {
  ContactFormService,
  ContactFormValue,
} from 'src/app/services/form/contact-form.service';
import { PortfolioMessagesService } from 'src/app/services/data/portfolio-message.service';

describe('ContactFormComponent', () => {
  let fixture: ComponentFixture<ContactFormComponent>;
  let component: ContactFormComponent;
  let formService: ContactFormService;
  let portfolioService: jasmine.SpyObj<PortfolioMessagesService>;

  beforeEach(async () => {
    const portfolioSpy = jasmine.createSpyObj('PortfolioMessagesService', [
      'sendMessage',
    ]);
    const snackSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent, NoopAnimationsModule],
      providers: [
        { provide: PortfolioMessagesService, useValue: portfolioSpy },
        { provide: MatSnackBar, useValue: snackSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;

    formService = TestBed.inject(ContactFormService);
    portfolioService = TestBed.inject(
      PortfolioMessagesService
    ) as jasmine.SpyObj<PortfolioMessagesService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable Send button initially', () => {
    const btn: HTMLButtonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;
    expect(btn.disabled).toBeTrue();
  });

  it('should enable Send button when form is valid', () => {
    const valid: ContactFormValue = {
      name: 'Bob',
      email: 'bob@example.com',
      company: 'Acme',
      message: 'Hello',
    };
    formService.form.setValue(valid);
    formService.form.markAsDirty();
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;
    expect(btn.disabled).toBeFalse();
  });

  it('should show email required error when touched and empty', () => {
    const emailCtrl = formService.form.get('email')!;
    emailCtrl.markAsTouched();
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css('mat-error'));
    expect(errors.length).toBe(1);
    expect(errors[0].nativeElement.textContent.trim()).toBe(
      'Email is required'
    );
  });

  it('should display thank-you message after a successful send', async () => {
    const payload: ContactFormValue = {
      name: 'Alice',
      email: 'alice@example.com',
      company: 'ExampleCo',
      message: 'Hi there',
    };
    formService.form.setValue(payload);
    formService.form.markAsDirty();
    portfolioService.sendMessage.and.returnValue(Promise.resolve('new-id'));

    await component.onSubmit();
    fixture.detectChanges();

    const titleText = fixture.debugElement.query(By.css('mat-card-title'))
      .nativeElement.textContent;
    expect(titleText).toContain('Thank you for your interest');

    const subtitleText = fixture.debugElement.query(By.css('mat-card-subtitle'))
      .nativeElement.textContent;
    expect(subtitleText).toContain('I will be contacting you shortly');
  });
});
