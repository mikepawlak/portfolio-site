import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { trigger, transition, style, animate } from '@angular/animations';
import { WorkExperience } from 'src/app/services/data/work-experience.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-work-history-item',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    DatePipe,
  ],
  templateUrl: './work-history-item.component.html',
  styleUrl: './work-history-item.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('250ms ease-out', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, height: 0 })),
      ]),
    ]),
  ],
})
export class WorkHistoryItemComponent {
  @Input() experience: WorkExperience;
  expanded = false;

  toggle() {
    this.expanded = !this.expanded;
  }
}
