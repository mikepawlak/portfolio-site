import { Component } from '@angular/core';
import { ProjectItemComponent } from './project-item/project-item.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { take, map } from 'rxjs/operators';
import { ProjectDetailSheetComponent } from './modals/project-detail-sheet/project-detail-sheet.component';
import { ProjectDetailDialogComponent } from './modals/project-detail-dialog/project-detail-dialog.component';

export interface Project {
  title: string;
  img: string;
  banner: string;
  description: string;
  content: string;
}

@Component({
  selector: 'app-project-list',
  imports: [ProjectItemComponent],
  standalone: true,
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent {
  projects: Project[] = [
    {
      title: 'Project Title 1',
      img: 'https://placehold.co/300x200',
      banner: 'https://placehold.co/300x100',
      description: 'ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
          eu fugiat nulla pariatur.`,
    },
    {
      title: 'Project Title 2',
      img: 'https://placehold.co/300x200',
      banner: 'https://placehold.co/300x100',
      description: 'ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
          eu fugiat nulla pariatur.`,
    },
    {
      title: 'Project Title 3',
      img: 'https://placehold.co/300x200',
      banner: 'https://placehold.co/300x100',
      description: 'ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
          eu fugiat nulla pariatur.`,
    },
  ];

  constructor(
    private breakpoint: BreakpointObserver,
    private dialog: MatDialog,
    private sheet: MatBottomSheet
  ) {}

  openDetail(project: Project) {
    this.breakpoint
      .observe([Breakpoints.Handset])
      .pipe(
        take(1),
        map(r => r.matches)
      )
      .subscribe(isMobile => {
        if (isMobile) {
          this.sheet.open(ProjectDetailSheetComponent, {
            data: { project, projects: this.projects },
            panelClass: 'full-height-sheet',
          });
        } else {
          this.dialog.open(ProjectDetailDialogComponent, {
            data: { project, projects: this.projects },
            width: '600px',
          });
        }
      });
  }
}
