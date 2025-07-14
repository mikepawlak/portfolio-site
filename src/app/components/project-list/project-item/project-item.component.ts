import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Project } from '../project-list.component';

@Component({
  selector: 'app-project-item',
  imports: [MatCardModule],
  standalone: true,
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss',
})
export class ProjectItemComponent {
  @Input() project?: Project;
  @Input() projects?: Project[];

  @Output() openDetail = new EventEmitter<Project>();
}
