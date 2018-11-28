import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {CollectionResponse, ItemResponse} from '..';

@Injectable()
export abstract class W3AbstractRequestService<T> {

    public page = 1;
    public perPage = 15;
    public metas: any;

    public paginationData = {
        total: 0,
        per_page: 0
    };

    protected constructor(protected http: HttpClient) {
    }

    abstract getBaseUrl(): string;

    protected transformItemResponse(data: any): T {
        console.log('transformItemResponse', data);
        return data;
    }

    protected transformCollectionResponse(collect: any[]): T[] {
        return collect.map(d => this.transformItemResponse(d));
    }

    protected transformRequest(data: any): any {
        console.log('transformRequest', data);
        return data;
    }

    find(id: number, params: any): Observable<T> {
        return this.http
            .get<ItemResponse>(`${this.getBaseUrl()}/${id}`, {params})
            .pipe(map(res => this.transformItemResponse(res.data)));
    }


    /** retorna os primeiros 15 items itens da rota + includes */
    get(includes: string): Observable<T[]> {
        return this.search({
            'include': includes,
            'paginate': this.perPage
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
        return this.http
            .get<CollectionResponse>(this.getBaseUrl(), {params})
            .pipe(
                tap(res => {
                    this.metas = res.meta;
                        this.paginationData.total = +res.meta.total;
                        this.paginationData.per_page = +res.meta.per_page;
                }),
                map(res => this.transformCollectionResponse(res.data))
            );
    }

    /** salva data */
    save(data): Observable<T> {
        return this.http
            .post<ItemResponse>(this.getBaseUrl(), this.transformRequest(data))
            .pipe(map(res => this.transformItemResponse(res.data)));
    }

    /** edita informações do idem id */
    update(id: number, data: any): Observable<T> {
        return this.http
            .put<ItemResponse>(`${this.getBaseUrl()}/${id}`, this.transformRequest(data))
            .pipe(map(res => this.transformItemResponse(res.data)));
    }

    /** remove registro */
    remove(id: number): Observable<ItemResponse> {
        return this.http
            .delete<ItemResponse>(`${this.getBaseUrl()}/${id}`);
    }

    /** Registra a pagina */
    setPage(newPage: number): void {
        this.page = newPage;
    }

    pagination(): any {
        return this.paginationData;
    }

}
