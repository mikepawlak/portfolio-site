import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing.page.component';

@Component({ selector: 'app-title', template: '' })
class FakeTitleComponent {}

@Component({ selector: 'app-social-buttons', template: '' })
class FakeSocialButtonsComponent {}

@Component({ selector: 'app-work-history-list', template: '' })
class FakeWorkHistoryListComponent {}

@Component({ selector: 'app-project-list', template: '' })
class FakeProjectListComponent {}

@Component({ selector: 'app-contact-form', template: '' })
class FakeContactFormComponent {}

@Component({ selector: 'app-footer', template: '' })
class FakeFooterComponent {}

describe('LandingPageComponent', () => {
  let fixture: ComponentFixture<LandingPageComponent>;
  let component: LandingPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageComponent],
    })
      .overrideComponent(LandingPageComponent, {
        set: {
          imports: [
            FakeTitleComponent,
            FakeSocialButtonsComponent,
            FakeWorkHistoryListComponent,
            FakeProjectListComponent,
            FakeContactFormComponent,
            FakeFooterComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
