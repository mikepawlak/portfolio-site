import { Component } from '@angular/core';
import { WorkHistoryItemComponent } from './work-history-item/work-history-item.component';

@Component({
  selector: 'app-work-history-list',
  imports: [WorkHistoryItemComponent],
  templateUrl: './work-history-list.component.html',
  styleUrl: './work-history-list.component.scss',
})
export class WorkHistoryListComponent {}
