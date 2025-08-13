import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  QueryList,
  DestroyRef,
  inject,
  NgZone,
} from '@angular/core';
import { WorkHistoryItemComponent } from './work-history-item/work-history-item.component';
import {
  WorkExperience,
  WorkExperienceService,
} from 'src/app/services/data/work-experience.service';

@Component({
  selector: 'app-work-history-list',
  imports: [WorkHistoryItemComponent],
  templateUrl: './work-history-list.component.html',
  styleUrl: './work-history-list.component.scss',
})
export class WorkHistoryListComponent implements OnInit, AfterViewInit {
  workExperiences: WorkExperience[] = [];
  loaded = false;

  @ViewChildren(WorkHistoryItemComponent)
  items!: QueryList<WorkHistoryItemComponent>;
  @ViewChildren(WorkHistoryItemComponent, { read: ElementRef })
  itemEls!: QueryList<ElementRef<HTMLElement>>;

  private io?: IntersectionObserver;
  private didExpandFirst = false;
  private destroyRef = inject(DestroyRef);
  private zone = inject(NgZone);

  constructor(private workExperienceService: WorkExperienceService) {}

  async ngOnInit() {
    this.workExperiences = await this.workExperienceService.getAllExperiences();
    this.loaded = true;
  }

  ngAfterViewInit(): void {
    const setup = () => {
      if (this.itemEls.length >= 2 && !this.io) {
        const secondEl = this.itemEls.get(1)!.nativeElement;

        this.io = new IntersectionObserver(
          entries => {
            const entry = entries[0];
            if (entry.isIntersecting && !this.didExpandFirst) {
              this.zone.run(() => {
                this.items.get(0)?.toggle(); // "click" first item
                this.didExpandFirst = true;
              });
              this.io?.disconnect();
            }
          },
          { root: null, threshold: 0.9 }
        );

        this.io.observe(secondEl);
        this.destroyRef.onDestroy(() => this.io?.disconnect());
      }
    };

    setup();
    this.itemEls.changes.subscribe(setup);
  }
}
