import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  updateTask(id: string, task: any): Observable<any> {
    console.log(task);
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getTasksByStatus(status: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?status=${status}`);
  }

  sortTasksByDueDate(date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?sort=${date}`);
  }

  getTasksByUser(userId: string): Observable<any> {
    return this.http.get(`http://localhost:8080/api/users/${userId}/tasks`);
  }
}
