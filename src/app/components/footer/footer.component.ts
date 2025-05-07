import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SocialButtonsComponent } from '../social-buttons/social-buttons.component';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule, MatButtonModule, SocialButtonsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements AfterViewInit {
  @ViewChild('scrollBtn', { read: ElementRef })
  scrollBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('arrowIcon', { read: ElementRef })
  arrowIcon!: ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngAfterViewInit() {
    const obs: IntersectionObserver = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.arrowIcon.nativeElement, 'wiggle-3x');
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(this.scrollBtn.nativeElement);
  }

  scrollToTop() {
    const container = this.doc.querySelector(
      'body.mat-app-background'
    ) as HTMLElement;
    if (container) {
      container.style.scrollBehavior = 'smooth';
      container.scrollTo({ top: 0 });
    }
  }
}
