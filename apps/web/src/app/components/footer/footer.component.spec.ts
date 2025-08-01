import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';
import { SocialButtonsComponent } from '../social-buttons/social-buttons.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let ioCallback: IntersectionObserverCallback;
  let observeSpy: jasmine.Spy;
  let unobserveSpy: jasmine.Spy;

  beforeEach(async () => {
    // Mock IntersectionObserver globally
    observeSpy = jasmine.createSpy('observe');
    unobserveSpy = jasmine.createSpy('unobserve');
    class MockIntersectionObserver {
      constructor(private cb: IntersectionObserverCallback) {
        ioCallback = cb;
      }
      observe = observeSpy;
      unobserve = unobserveSpy;
    }
    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: MockIntersectionObserver,
    });

    // stub scrollTo on body.mat-app-background
    document.body.classList.add('mat-app-background');
    (document.body as HTMLElement).scrollTo = jasmine.createSpy('scrollTo');

    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set up IntersectionObserver on scrollBtn', () => {
    expect(observeSpy).toHaveBeenCalledWith(component.scrollBtn.nativeElement);
  });

  it('should add wiggle class when scrollBtn enters viewport', () => {
    spyOn(component['renderer'], 'addClass');
    // simulate entry
    ioCallback(
      [
        {
          isIntersecting: true,
          target: component.scrollBtn.nativeElement,
        } as unknown as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver
    );

    expect(component['renderer'].addClass).toHaveBeenCalledWith(
      component.arrowIcon.nativeElement,
      'wiggle-3x'
    );
    expect(unobserveSpy).toHaveBeenCalledWith(
      component.scrollBtn.nativeElement
    );
  });

  it('scrollToTop should scroll body.mat-app-background to top smoothly', () => {
    component.scrollToTop();
    expect(document.body.style.scrollBehavior).toBe('smooth');

    expect((document.body as any).scrollTo).toHaveBeenCalledWith({ top: 0 }); // eslint-disable-line @typescript-eslint/no-explicit-any
  });

  it('clicking the button triggers scrollToTop()', () => {
    spyOn(component, 'scrollToTop');
    const btn = fixture.debugElement.query(By.css('button')).nativeElement;
    btn.click();
    expect(component.scrollToTop).toHaveBeenCalled();
  });

  it('should render SocialButtonsComponent and copyright text', () => {
    const social = fixture.debugElement.query(
      By.directive(SocialButtonsComponent)
    );
    expect(social).toBeTruthy();

    const copyright = fixture.debugElement.query(
      By.css('footer span.copyright')
    ).nativeElement;
    expect(copyright.textContent).toContain('2025: made by me');
  });
});
