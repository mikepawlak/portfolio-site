import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-project-tracker',
  imports: [MatButtonModule],
  templateUrl: './project-tracker.component.html',
  styleUrl: './project-tracker.component.scss',
})
export class ProjectTrackerComponent {
  @Input() disableBack = false;
  @Input() disableNext = false;

  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  onNext() {
    if (!this.disableNext) this.next.emit();
  }

  onBack() {
    if (!this.disableBack) this.back.emit();
  }
}
