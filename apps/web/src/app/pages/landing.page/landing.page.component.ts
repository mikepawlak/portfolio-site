import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { WorkHistoryListComponent } from '../../components/work-history-list/work-history-list.component';
import { ProjectListComponent } from '../../components/project-list/project-list.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FeatureFlagService } from 'src/app/services/feature-flag.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-landing-page',
  imports: [
    TitleComponent,
    WorkHistoryListComponent,
    ProjectListComponent,
    ContactFormComponent,
    FooterComponent,
    MatIconModule,
  ],
  templateUrl: './landing.page.component.html',
  styleUrl: './landing.page.component.scss',
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  @ViewChild('workHistory', { read: ElementRef })
  workHistoryEl?: ElementRef<HTMLElement>;
  projectsEnabled = false;
  infoVisible = false;

  private destroyRef = inject(DestroyRef);
  private ngZone = inject(NgZone);

  constructor(private featureFlag: FeatureFlagService) {}

  ngOnInit(): void {
    this.featureFlag
      .getFlag('show_projects')
      .subscribe((enabled: boolean) => (this.projectsEnabled = enabled));
  }

  ngAfterViewInit(): void {
    const target = this.workHistoryEl?.nativeElement;
    if (!target) return;

    const io = new IntersectionObserver(
      (entries, obs) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          this.ngZone.run(() => {
            this.infoVisible = true;
          });
          obs.disconnect();
        }
      },
      { root: null, threshold: 0.9 }
    );

    io.observe(target);
    this.destroyRef.onDestroy(() => io.disconnect());
  }

  onSeeMore() {
    const el = this.workHistoryEl?.nativeElement;
    if (!el) return;

    const start =
      document.body.scrollTop ||
      document.documentElement.scrollTop ||
      window.scrollY ||
      0;
    const targetY = el.getBoundingClientRect().top + start;
    const max = Math.max(0, document.body.scrollHeight - window.innerHeight);
    const top = Math.min(Math.max(0, targetY), max);

    document.body.scrollTo({ top, behavior: 'smooth' });
  }
}
