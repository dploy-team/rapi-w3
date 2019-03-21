import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Response20x, ResponseCollection, ResponseItem} from '..';

@Injectable()
export abstract class W3AbstractRequestService<T> {

    public metas: any;

    public paginationData = {
        page: 1,
        total: 0,
        per_page: 0,
        current_page: 0
    };

    protected constructor(protected http: HttpClient) {
    }

    abstract getBaseUrl(): string;

    protected makeUrl(path = ''): string {
        return this.getBaseUrl() + path;
    }

    protected transformItemResponse(data: any): T {
        return data;
    }

    protected transformCollectionResponse(collect: any[]): T[] {
        return collect.map(d => this.transformItemResponse(d));
    }

    protected transformRequest(data: any, action: string): any {
        return data;
    }

    find(id: number, params?: any): Observable<T> {
        params = params ? this.transformRequest(params, 'find') : {};

        return this.http
            .get<ResponseItem<T>>(`${this.getBaseUrl()}/${id}`, {params})
            .pipe(map(res => this.transformItemResponse(res.data)));
    }


    /** retorna os primeiros 15 items itens da rota + includes */
    get(includes: string): Observable<T[]> {
        return this.search({
            'include': includes,
            'paginate': this.paginationData.per_page
        });
    }

    /** retorna todos os itens da rota + includes */
    all(includes: string): Observable<T[]> {
        return this.search({
            'include': includes,
            'take': -1
        });
    }

    /** retorna os itens da rota  filtrados por params*/
    search(params): Observable<T[]> {
        params = this.transformRequest(params, 'search');

        return this.http
            .get<ResponseCollection<T>>(this.getBaseUrl(), {params})
            .pipe(
                tap(res => {
                    this.metas = res.meta || {};
                    this.paginationData.total = +this.metas.total;
                    this.paginationData.page = +this.metas.current_page;
                    this.paginationData.per_page = +this.metas.per_page;
                }),
                map(res => this.transformCollectionResponse(res.data))
            );
    }

    /** salva data */
    save(data): Observable<T> {
        return this.http
            .post<Response20x>(this.getBaseUrl(), this.transformRequest(data, 'save'))
            .pipe(map(res => this.transformItemResponse(res.data)));
    }

    /** edita informações do idem id */
    update(id: number, data: any): Observable<T> {
        return this.http
            .put<Response20x>(`${this.getBaseUrl()}/${id}`, this.transformRequest(data, 'update'))
            .pipe(map(res => this.transformItemResponse(res.data)));
    }

    /** remove registro */
    remove(id: number): Observable<boolean> {
        return this.http
            .delete<Response20x>(`${this.getBaseUrl()}/${id}`)
            .pipe(map(res => res.status === 'success'));
    }

    /** Registra a pagina */
    setPage(newPage: number): void {
        this.paginationData.page = newPage;
    }

    pagination(): any {
        return this.paginationData;
    }
}
