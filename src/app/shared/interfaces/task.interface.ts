import { User } from './user.interface';

export interface Task {
  id?: number;
  title: string;
  description: string;
  createdAt?: Date;
  dueDate: Date;
  status: string;
  user: User;
}
