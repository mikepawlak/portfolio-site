import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LandingPageComponent } from './landing.page.component';
import { FeatureFlagService } from 'src/app/services/data/feature-flag.service';

// Fake child components
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

// Mock service
class FakeRemoteConfigService {
  getFlag = jasmine.createSpy().and.returnValue(of(true));
}

describe('LandingPageComponent', () => {
  let fixture: ComponentFixture<LandingPageComponent>;
  let component: LandingPageComponent;
  let mockService: FakeRemoteConfigService;

  beforeEach(async () => {
    mockService = new FakeRemoteConfigService();

    await TestBed.configureTestingModule({
      imports: [LandingPageComponent],
      providers: [{ provide: FeatureFlagService, useValue: mockService }],
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

  it('should set projectsEnabled based on feature flag', () => {
    expect(mockService.getFlag).toHaveBeenCalledWith('show_projects');
    expect(component.projectsEnabled).toBeTrue();
  });
});
