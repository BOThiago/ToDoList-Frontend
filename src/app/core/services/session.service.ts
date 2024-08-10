import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';
import { LoadingService } from './loading.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private sessionKey = 'userSession';
  constructor(
    private loading: LoadingService,
    private localStorage: LocalStorageService
  ) {}

  set(user: UserModel): void {
    this.localStorage.setItem(this.sessionKey, JSON.stringify(user));
  }

  get(): UserModel | void {
    let session = this.localStorage.getItem(this.sessionKey);
    if (session != null) {
      return JSON.parse(session) as UserModel;
    }
  }

  get isLogged(): boolean {
    if (this.get()) {
      return true;
    }
    return false;
  }

  getToken(): string | undefined {
    return this.get()?.token;
  }

  logOut() {
    this.localStorage.clear();
    window.location.href = '/login';
    this.loading.showLoading(false);
  }
}
