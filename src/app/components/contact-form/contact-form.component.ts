import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PortfolioMessagesService } from 'src/app/services/data/portfolio-message.service';
import {
  ContactFormService,
  ContactFormValue,
} from 'src/app/services/form/contact-form.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({ opacity: 0, transform: 'scale(0.95)' })
        ),
      ]),
    ]),
  ],
})
export class ContactFormComponent {
  contactForm = this.contactFormService.form;
  formSubmitted = false;

  constructor(
    private contactFormService: ContactFormService,
    private portfolioMessageService: PortfolioMessagesService,
    private snackBar: MatSnackBar
  ) {}

  async onSubmit() {
    const submission: ContactFormValue = this.contactFormService.submit();

    try {
      await this.portfolioMessageService.sendMessage(submission);
      this.formSubmitted = true;
    } catch (err) {
      console.error(err);
      this.snackBar.open(
        'Oops—something went wrong sending your message. Try again later.',
        'Close',
        { duration: 5000 }
      );
    }
  }
}
