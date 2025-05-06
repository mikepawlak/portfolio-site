// src/app/components/contact-form/contact-form.component.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ContactFormService } from 'src/app/services/form/contact-form.service';

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
  ],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  contactForm = this.contactFormService.form;

  constructor(private contactFormService: ContactFormService) {}

  onSubmit() {
    this.contactFormService.submit().subscribe({
      next: () => alert('Message sent!'),
      error: () => alert('Please fix errors and try again.'),
    });
  }
}
