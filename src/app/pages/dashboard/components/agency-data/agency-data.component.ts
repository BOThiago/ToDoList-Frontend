import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-agency-data',
  templateUrl: './agency-data.component.html',
  styleUrls: ['./agency-data.component.scss'],
})
export class AgencyDataComponent {
  @Input() tasksCount?: number;
  @Input() usersCount?: number;
}
