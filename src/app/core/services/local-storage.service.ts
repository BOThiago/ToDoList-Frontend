import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private isLocalStorageAvailable: boolean;
  private inMemoryStorage: { [key: string]: string } = {};

  constructor() {
    this.isLocalStorageAvailable = typeof localStorage !== 'undefined';
  }

  setItem(key: string, value: string): void {
    if (this.isLocalStorageAvailable) {
      localStorage.setItem(key, value);
    } else {
      this.inMemoryStorage[key] = value;
    }
  }

  getItem(key: string): string | null {
    if (this.isLocalStorageAvailable) {
      return localStorage.getItem(key);
    } else {
      return this.inMemoryStorage[key] || null;
    }
  }

  removeItem(key: string): void {
    if (this.isLocalStorageAvailable) {
      localStorage.removeItem(key);
    } else {
      delete this.inMemoryStorage[key];
    }
  }

  clear(): void {
    if (this.isLocalStorageAvailable) {
      localStorage.clear();
    } else {
      this.inMemoryStorage = {};
    }
  }
}
