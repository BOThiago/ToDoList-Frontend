import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/interfaces/user.interface';

export interface Response<T> {
  message: string;
  statusCode: number;
  success: boolean;
  data: T[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Response<User>> {
    return this.http.get<Response<User>>(this.apiUrl);
  }

  createUser(user: User): Observable<Response<User>> {
    return this.http.post<Response<User>>(this.apiUrl, user);
  }

  updateUser(id: string, user: User): Observable<Response<User>> {
    return this.http.put<Response<User>>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<Response<null>> {
    return this.http.delete<Response<null>>(`${this.apiUrl}/${id}`);
  }
}
