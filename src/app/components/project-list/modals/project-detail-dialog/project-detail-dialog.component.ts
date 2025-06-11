import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Project } from '../../project-list.component';
import { ProjectTrackerComponent } from '../shared/project-tracker/project-tracker.component';

@Component({
  selector: 'app-project-detail-dialog',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    ProjectTrackerComponent,
  ],
  templateUrl: './project-detail-dialog.component.html',
  styleUrl: './project-detail-dialog.component.scss',
})
export class ProjectDetailDialogComponent {
  currentIndex = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { project: Project; projects: Project[] },
    private ref: MatDialogRef<ProjectDetailDialogComponent>
  ) {
    this.currentIndex = data.projects.findIndex(p => p === data.project);
  }

  close() {
    this.ref.close();
  }

  onNext() {
    if (this.currentIndex < this.data.projects.length - 1) {
      this.currentIndex++;
      this.data.project = this.data.projects[this.currentIndex];
    }
  }

  onBack() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.data.project = this.data.projects[this.currentIndex];
    }
  }
}
