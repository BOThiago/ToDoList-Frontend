import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading?: boolean;

  public showLoading(v: boolean): void {
    this.loading = v;
    const element = document.body;
    if (v) {
      element.style.overflow = 'hidden';
      element.style.pointerEvents = 'none';
    } else {
      element.style.overflow = '';
      element.style.pointerEvents = '';
    }
  }

  public get isLoading(): boolean {
    return this.loading ?? false;
  }

  constructor() {}
}
