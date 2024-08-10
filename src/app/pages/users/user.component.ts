import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/shared/components/basic-data-table/basic-data-table.component';
import { User } from '../../shared/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  protected selectedDate?: string;
  newUser: User = {
    username: '',
    nivel: 'user',
  };
  protected displayedColumns: Column[] = [
    { label: 'Username', value: 'username' },
    { label: 'Nivel', value: 'nivel' },
    { label: 'Ações', value: 'id', type: 'actions' },
  ];
  protected data: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  public loadUsers(): void {
    this.userService.getUsers().subscribe((response) => {
      this.data = response.data;
    });
  }

  createUser(): void {
    this.userService.createUser(this.newUser).subscribe(() => this.loadUsers());
  }

  updateUser(id: string, user: User): void {
    this.userService.updateUser(id, user).subscribe(() => this.loadUsers());
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }
}
