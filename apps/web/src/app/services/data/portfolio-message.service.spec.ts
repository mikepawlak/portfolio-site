import { TestBed } from '@angular/core/testing';
import { FirestoreWrapper } from './firestore.service';
import { ContactFormValue } from '../form/contact-form.service';
import { PortfolioMessagesService } from './portfolio-message.service';

class FakeFirestoreWrapper {
  public addDocument = jasmine.createSpy('addDocument');
}

describe('PortfolioMessagesService', () => {
  let service: PortfolioMessagesService;
  let wrapper: FakeFirestoreWrapper;

  beforeEach(() => {
    wrapper = new FakeFirestoreWrapper();
    TestBed.configureTestingModule({
      providers: [
        PortfolioMessagesService,
        { provide: FirestoreWrapper, useValue: wrapper },
      ],
    });
    service = TestBed.inject(PortfolioMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sendMessage() should call wrapper.addDocument with the correct collection and data, and return the new ID', async () => {
    const payload: ContactFormValue = {
      name: 'Alice',
      email: 'alice@example.com',
      company: 'ExampleCo',
      message: 'Hello!',
    };
    wrapper.addDocument.and.returnValue(Promise.resolve('new-doc-id'));

    const result = await service.sendMessage(payload);

    expect(result).toBe('new-doc-id');

    expect(wrapper.addDocument).toHaveBeenCalledTimes(1);
    const [collection, docData] = wrapper.addDocument.calls.mostRecent().args;
    expect(collection).toBe('portfolioMessages');
    expect(docData).toEqual(
      jasmine.objectContaining({
        name: 'Alice',
        email: 'alice@example.com',
        company: 'ExampleCo',
        message: 'Hello!',
        sentAt: jasmine.any(Date),
      })
    );
  });

  it('sendMessage() should propagate errors from wrapper.addDocument', async () => {
    const payload: ContactFormValue = {
      name: 'Bob',
      email: 'bob@example.com',
      company: 'Acme',
      message: 'Test error',
    };
    wrapper.addDocument.and.returnValue(Promise.reject(new Error('fail')));

    await expectAsync(service.sendMessage(payload)).toBeRejectedWithError(
      'fail'
    );
  });
});
