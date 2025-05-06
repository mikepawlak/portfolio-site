import { Component } from '@angular/core';
import { ProjectItemComponent } from './project-item/project-item.component';

@Component({
  selector: 'app-project-list',
  imports: [ProjectItemComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent {}
