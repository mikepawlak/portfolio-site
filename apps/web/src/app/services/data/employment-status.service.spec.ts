import { TestBed } from '@angular/core/testing';
import {
  EmploymentStatus,
  EmploymentStatusService,
} from './employment-status.service';
import { FirestoreWrapper } from './firestore.service';

class FakeFirestoreWrapper {
  public calls = 0;
  constructor(public fakeList: EmploymentStatus[] = []) {}

  async getByFieldEquals<D>(): Promise<(D & { id: string })[]> {
    this.calls++;
    return this.fakeList as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

describe('EmploymentStatusService', () => {
  let svc: EmploymentStatusService;
  let fakeWrap: FakeFirestoreWrapper;

  beforeEach(() => {
    fakeWrap = new FakeFirestoreWrapper([
      { id: '1', active: true, location: 'A', title: 'X' },
    ]);

    TestBed.configureTestingModule({
      providers: [
        EmploymentStatusService,
        { provide: FirestoreWrapper, useValue: fakeWrap },
      ],
    });

    svc = TestBed.inject(EmploymentStatusService);
    spyOn(console, 'warn');
  });

  it('returns first active', async () => {
    const result = await svc.getFirstActiveStatus();
    expect(result!.id).toBe('1');
    expect(fakeWrap.calls).toBe(1);
  });

  it('warns if more than one active status', async () => {
    fakeWrap.fakeList.push({
      id: '2',
      active: true,
      location: 'B',
      title: 'Y',
    });

    const result = await svc.getFirstActiveStatus();

    expect(console.warn).toHaveBeenCalledWith(
      'Multiple active statuses found (2): 1, 2'
    );
    expect(result!.id).toBe('1');
    expect(fakeWrap.calls).toBe(1);
  });

  it('returns undefined if none', async () => {
    fakeWrap.fakeList = [];
    const result = await svc.getFirstActiveStatus();
    expect(result).toBeUndefined();
    expect(fakeWrap.calls).toBe(1);
  });
});
