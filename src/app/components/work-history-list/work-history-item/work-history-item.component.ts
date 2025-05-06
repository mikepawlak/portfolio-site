import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-work-history-item',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './work-history-item.component.html',
  styleUrl: './work-history-item.component.scss',
  animations: [
    trigger('fadeInOut', [
      // when the <p> is added to the DOM
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('250ms ease-out', style({ opacity: 1, height: '*' })),
      ]),
      // when the <p> is removed from the DOM
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, height: 0 })),
      ]),
    ]),
  ],
})
export class WorkHistoryItemComponent {
  /** whether the extra text is currently shown */
  expanded = false;

  /** toggle the expanded state */
  toggle() {
    this.expanded = !this.expanded;
  }
}
