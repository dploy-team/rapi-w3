import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface W3MetaPagination {
    page: number;
    total: number;
    per_page: number;
    current_page: number;
}

export interface HttpPostOptions {
    headers?:
        | HttpHeaders
        | {
              [header: string]: string | string[];
          };
    observe?: 'body';
    params?:
        | HttpParams
        | {
              [param: string]: string | string[];
          };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}
