import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

/**
 * Shape of the contact-form payload that will be sent to the backend.
 */
export interface ContactFormValue {
  name: string;
  email: string;
  company: string;
  message: string;
}

/**
 * Service responsible for building, validating, and submitting the contact form.
 */
@Injectable({ providedIn: 'root' })
export class ContactFormService {
  /**
   * The FormGroup representing the contact form
   * - name: optional
   * - email: required, must be a valid email
   * - company: optional
   * - message: required
   */
  public form: FormGroup;

  /**
   * @param fb   FormBuilder to construct the FormGroup
   * @param http HttpClient for sending the form payload
   */
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      message: ['', Validators.required],
    });
  }

  /**
   * Validates and submits the form to the backend.
   *
   * @throws Error if the form is invalid (after marking all as touched)
   * @returns Observable emitting the server response
   */
  submit(): Observable<ContactFormValue> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      throw new Error('ContactFormService: form is invalid');
    }

    const payload: ContactFormValue = this.form.value;
    this.resetForm();
    return of(payload);
  }

  /**
   * Resets the contact form to its initial state:
   * - Clears all control values
   * - Marks the form and controls as pristine and untouched
   * - Removes any top‐level errors
   *
   * @public
   * @returns void
   */
  resetForm(): void {
    this.form.reset();
    this.form.updateValueAndValidity();

    Object.values(this.form.controls).forEach(control => {
      control.setErrors(null);
    });
  }
}
