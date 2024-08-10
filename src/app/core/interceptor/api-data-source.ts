import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import {
  Observable,
  ObservableInput,
  catchError,
  of,
  retry,
  tap,
  throwError,
} from 'rxjs';
import { SessionService } from '../services/session.service';
import { ToastService } from '../services/toast.service';
import { CacheService } from '../services/cache.service';

@Injectable({ providedIn: 'root' })
export class ApiDataSource {
  private baseUrl: string;
  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
    private sessionService: SessionService,
    private notificationService: ToastService
  ) {
    this.baseUrl = 'http://127.0.0.1:5000';
  }

  /**
   * @return An `Observable` of all `HttpEvent`s for the request,
   */
  public request<T>(value: Parameters | string): Observable<T | undefined> {
    let parameters: Parameters;
    if (typeof value == 'string') {
      let parameters: Parameters = { url: value };
    } else {
      parameters = value;
    }
    // Define valores iniciais
    parameters!.method ??= 'get';
    parameters!.authenticate ??= true;
    parameters!.handleErrors ??= true;
    parameters!.cache ??= false;
    parameters!.cacheSeconds ??= 3;
    parameters!.retryCount ??= 0;
    parameters!.options ??= { headers: {} };
    parameters!.options.headers ??= {};

    // Add CORS Bypass
    parameters!.options.headers = {
      'Access-Control-Allow-Origin': '*',
    };

    if (parameters!.queryParams) {
      parameters!.options.params = parameters!.queryParams;
    }

    let { url, method } = parameters!;
    // Informa possível engano
    if (method !== 'get' && !parameters!.payload) {
      console.warn(`Requisição do tipo ${method} realizada sem corpo`);
    }

    // Trata cache
    if (parameters!.cache) {
      let cacheKey =
        method + ':' + url + (parameters!.queryParams ?? '').toString();
      const cachedData = this.cacheService.get(cacheKey);
      if (cachedData) {
        return of(cachedData);
      }
    }

    // chama método para requisição
    try {
      let apiRequest;
      switch (method) {
        case 'get':
          apiRequest = this.get<T>(parameters!);
          break;
        case 'post':
          apiRequest = this.post<T>(parameters!);
          break;
        case 'put':
          apiRequest = this.put<T>(parameters!);
          break;
        case 'delete':
          apiRequest = this.delete<T>(parameters!);
          break;
      }
      return apiRequest!.pipe(
        catchError((error) => {
          if (parameters!.handleErrors) {
            this.errorHandler(error);
            return of(undefined);
          } else {
            throw error;
          }
        })
      );
    } catch (error) {
      if (parameters!.handleErrors) {
        this.errorHandler(error);
        return new Observable<T>();
      } else {
        throw error;
      }
    }
  }

  private get<T>({
    url,
    options,
    cache,
    cacheSeconds,
  }: Parameters): Observable<T> {
    return this.http.get<T>(this.baseUrl + url, options).pipe(
      tap((data) => {
        if (cache) {
          let cacheKey = 'get:' + url + (options?.params ?? '').toString();
          this.cacheService.put(cacheKey, data, cacheSeconds! * 1000);
        }
      })
    );
  }

  private post<T>({
    url,
    payload,
    options,
    cache,
    cacheSeconds,
  }: Parameters): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, payload, options).pipe(
      tap((data) => {
        if (cache) {
          let cacheKey = 'post:' + url + (options?.params ?? '').toString();
          this.cacheService.put(cacheKey, data, cacheSeconds! * 1000);
        }
      })
    );
  }

  private put<T>({
    url,
    payload,
    options,
    cache,
    cacheSeconds,
  }: Parameters): Observable<T> {
    return this.http.put<T>(this.baseUrl + url, payload, options).pipe(
      tap((data) => {
        if (cache) {
          let cacheKey = 'put:' + url + (options?.params ?? '').toString();
          this.cacheService.put(cacheKey, data, cacheSeconds! * 1000);
        }
      })
    );
  }

  private delete<T>({ url, options }: Parameters): Observable<T> {
    return this.http.delete<T>(this.baseUrl + url, options);
  }

  private errorHandler(error: any): ObservableInput<any> {
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('Client-side error:', error.error.message);
      } else {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.sessionService.logOut();
            this.notificationService.error('Acesso negado');
            return throwError(() => new Error('Acesso negado'));
          }
          if (typeof error.error == 'object') {
            this.notificationService.error(
              error.error.error ?? error.error.message
            );
          } else {
            this.notificationService.error(error.error ?? error.message);
          }
        } else {
          this.notificationService.error(error);
        }
      }
    }
    return throwError(() => new Error('Acesso negado'));
  }
}

/**
 * @param method está definido por padrão como `'get'`
 * @param authenticate está definido por padrão como `true`
 * @param handleErrors está definido por padrão como `true`
 * @param cache está definido por padrão como `false`
 * @param cacheSeconds está definido por padrão como `3`
 * @param retryCount está definido por padrão como `0`
 */
interface Parameters {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  payload?: any | null;
  authenticate?: boolean;
  handleErrors?: boolean;
  queryParams?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  options?: {
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        };
    observe?: 'body';
    params?:
      | HttpParams
      | {
          [param: string]:
            | string
            | number
            | boolean
            | ReadonlyArray<string | number | boolean>;
        };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  };
  retryCount?: number;
  cache?: boolean;
  cacheSeconds?: number;
}
