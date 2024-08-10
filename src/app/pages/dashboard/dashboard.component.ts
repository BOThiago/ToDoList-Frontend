import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public taskCount?: number;
  public userCount?: number;

  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.taskService.getTasks().subscribe((response) => {
      this.taskCount = response.data.length;
    });
    this.userService.getUsers().subscribe((response) => {
      this.userCount = response.data.length;
    });
  }
}
