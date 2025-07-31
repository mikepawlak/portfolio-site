import { Component, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Project } from '../../project-list.component';
import { ProjectTrackerComponent } from '../shared/project-tracker/project-tracker.component';

@Component({
  selector: 'app-project-detail-sheet',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    ProjectTrackerComponent,
  ],
  templateUrl: './project-detail-sheet.component.html',
  styleUrl: './project-detail-sheet.component.scss',
})
export class ProjectDetailSheetComponent {
  currentIndex = 0;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { project: Project; projects: Project[] },
    private ref: MatBottomSheetRef<ProjectDetailSheetComponent>
  ) {
    this.currentIndex = data.projects.findIndex(p => p === data.project);
  }

  close() {
    this.ref.dismiss();
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
