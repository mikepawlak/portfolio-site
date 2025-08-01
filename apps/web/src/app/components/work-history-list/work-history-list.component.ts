import { Component, OnInit } from '@angular/core';
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
export class WorkHistoryListComponent implements OnInit {
  workExperiences: WorkExperience[];
  loaded = false;

  constructor(private workExperienceService: WorkExperienceService) {}

  async ngOnInit() {
    this.workExperiences = await this.workExperienceService.getAllExperiences();
    this.loaded = true;
  }
}
