import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/shared/components/basic-data-table/basic-data-table.component';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../shared/interfaces/task.interface';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  protected displayedColumns: Column[] = [
    { label: 'Título', value: 'title' },
    { label: 'Descrição', value: 'description' },
    { label: 'Data de Criação', value: 'createdAt', type: 'date' },
    { label: 'Data de Vencimento', value: 'dueDate', type: 'date' },
    { label: 'Status', value: 'status' },
    { label: 'Usuário', value: 'user', type: 'user' },
    { label: 'Ações', value: 'id', type: 'actions' },
  ];
  protected data: Task[] = [];
  protected usersList: User[] = [];
  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    createdAt: new Date(),
    dueDate: new Date(),
    status: 'pendente',
    user: {
      id: 0,
      username: '',
      nivel: 'user',
    },
  };

  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadUsersList();
  }

  public async loadTasks(): Promise<void> {
    try {
      const response = await firstValueFrom(this.taskService.getTasks());
      this.data = response.data;
    } catch (error) {
      console.error('Erro ao carregar as tarefas:', error);
    }
  }

  loadUsersList(): void {
    this.userService
      .getUsers()
      .subscribe((response) => (this.usersList = response.data));
  }

  createTask(): void {
    this.taskService.createTask(this.newTask).subscribe(() => this.loadTasks());
  }

  filterTasksByStatus(status: string): void {
    this.taskService.getTasksByStatus(status).subscribe((tasks) => {
      if (!tasks) {
        this.data = [];
      } else {
        this.data = tasks.data;
      }
    });
  }

  async sortTasksByDueDate(date: string): Promise<void> {
    await this.loadTasks();
    this.data = this.data.filter((item) => {
      const day = date.split('-')[2];

      const itemDate = new Date(item.dueDate);
      console.log(itemDate.getDate() === Number(day));
      return itemDate.getDate() === Number(day);
    });
  }

  filterByUser(id: string): void {
    this.taskService.getTasksByUser(id).subscribe((tasks) => {
      if (!tasks || tasks == null) {
        this.data = [];
      } else {
        this.data = tasks.data;
      }
    });
  }
}
