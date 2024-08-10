import { Injectable } from '@angular/core';
import { ApiDataSource } from '../core/interceptor/api-data-source';
import { LoginRequest } from '../shared/models/requests/login.request';
import { LoginResponse } from '../shared/models/responses/login.response';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private dataSource: ApiDataSource) {}

  login(payload: LoginRequest): Observable<LoginResponse | undefined> {
    return this.dataSource.request<LoginResponse>({
      method: 'post',
      url: '/Login',
      payload,
      authenticate: false,
    });
  }
}
