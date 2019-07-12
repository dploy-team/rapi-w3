import { Injectable } from "@angular/core";
import { W3AbstractRequestService } from "../../services/abstract-request.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpPostOptions } from "../../services/request.model";

/**
 * Sevice que auxilia nas consultas e inserções de metadados na API. Simula um banco NOSQL
 */
@Injectable()
export class W3MetaService {
  constructor(private http: HttpClient) {}

  /**
   * @ignore
   */
  protected getBaseUrl() {
    return `${environment.URL_API}/rapi/fuse/metas`;
  }

  /**
   * Pesquisa todas as metas
   * @param params
   */
  public search(params?: any): Observable<W3Meta[]> {
    return this.http
      .get(this.getBaseUrl(), { params: params })
      .pipe(map((res: any) => res.data));
  }

  /**
   * Insere um novo
   * @param meta
   * @param options
   */
  public store(meta: W3Meta, options?: HttpPostOptions): Observable<W3Meta> {
    return this.http
      .post(this.getBaseUrl(), meta, options)
      .pipe(map((res: any) => res.data));
  }

  /**
   * Autaliza um novo
   * @param meta
   * @param options
   */
  public update(
    meta: W3Meta,
    id: number,
    options?: HttpPostOptions
  ): Observable<W3Meta> {
    return this.http
      .put(this.getBaseUrl() + "/" + id, meta, options)
      .pipe(map((res: any) => res.data));
  }
}

export interface W3Meta {
  meta_key?: string;
  meta_value?: any;
  owner_type?: string;
  owner_id?: string;
}
