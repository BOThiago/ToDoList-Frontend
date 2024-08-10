import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  // private cache: Map<string, { data: any; expiration: number }> = new Map<
  //   string,
  //   { data: any; expiration: number }
  // >();

  constructor(private localStorage: LocalStorageService) {}

  get(url: string): any {
    // const cachedItem = this.cache.get(url);
    let cachedItem;
    if (
      this.localStorage.getItem(url) &&
      this.localStorage.getItem(url)?.includes('}')
    ) {
      cachedItem = JSON.parse(this.localStorage.getItem(url)!);
    }

    // Verifica se o item está no cache e se ainda não expirou
    if (cachedItem && cachedItem.expiration > Date.now()) {
      return cachedItem.data;
    }

    // Se não estiver em cache ou já expirou, retorna undefined
    this.localStorage.removeItem(url);
    return undefined;
  }

  put(url: string, data: any, expiresInMs: number): void {
    // Calcula o momento de expiração a partir do tempo atual e do tempo de expiração em milissegundos
    const expiration = Date.now() + expiresInMs;
    // this.cache.set(url, { data, expiration });
    this.localStorage.setItem(url, JSON.stringify({ data, expiration }));
  }
}
