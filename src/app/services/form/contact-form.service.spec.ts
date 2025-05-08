import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { ContactFormService, ContactFormValue } from './contact-form.service';

describe('ContactFormService', () => {
  let service: ContactFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    });
    service = TestBed.inject(ContactFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize form with the correct controls and empty defaults', () => {
    const form = service.form;
    expect(Object.keys(form.controls)).toEqual([
      'name',
      'email',
      'company',
      'message',
    ]);
    expect(form.value).toEqual({
      name: '',
      email: '',
      company: '',
      message: '',
    });
  });

  it('submit() on invalid form should throw and mark all as touched', () => {
    expect(service.form.valid).toBeFalse();
    expect(() => service.submit()).toThrowError(
      'ContactFormService: form is invalid'
    );
    ['email', 'message'].forEach(field => {
      expect(service.form.get(field)!.touched).toBeTrue();
    });
  });

  it('submit() on valid form should return the form value without resetting', () => {
    const payload: ContactFormValue = {
      name: 'Alice',
      email: 'alice@example.com',
      company: 'ExampleCo',
      message: 'Hi there',
    };
    service.form.setValue(payload);
    const result = service.submit();
    expect(result).toEqual(payload);
    // form should remain populated
    expect(service.form.value).toEqual(payload);
  });

  it('resetForm() should clear values, touched/dirty flags, and all errors', () => {
    service.form.setValue({
      name: 'X',
      email: 'bad',
      company: 'Y',
      message: 'Z',
    });
    const emailCtrl = service.form.get('email')!;
    emailCtrl.markAsTouched();
    emailCtrl.markAsDirty();
    emailCtrl.setErrors({ custom: true });
    service.form.setErrors({ group: true });

    service.resetForm();

    expect(service.form.value).toEqual({
      name: null,
      email: null,
      company: null,
      message: null,
    });
    Object.values(service.form.controls).forEach(ctrl => {
      expect(ctrl.pristine).toBeTrue();
      expect(ctrl.untouched).toBeTrue();
      expect(ctrl.errors).toBeNull();
    });
    expect(service.form.errors).toBeNull();
  });
});
