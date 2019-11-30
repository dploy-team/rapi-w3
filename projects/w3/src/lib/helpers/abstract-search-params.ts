import { w3IsEmpty, w3CheckIsNumeric } from "./utils";

/**
 * Helper para consultas
 */
export abstract class AbstractSearchParams {
  page = 1;
  paginate = 15;
  include: string;
  q: string;
  sort: string;

  vl_column: string;
  vl_start: string;
  vl_end: string;

  dt_column: string;
  dt_start: string;
  dt_end: string;

  constructor(params?: any) {
    if (params) {
      this.merge(params);
    }
  }

  /**
   * Atrbutos que vem na URL q devem ser transformados em ARRAY
   */
  protected attrsArrayable(): string[] {
    return [];
  }

  merge(params): void {
    Object.keys(params).forEach(k => {
      this[k] = params[k];
    });
  }

  getData(): any {
    return Object.keys(this).reduce((r, k) => {
      if (!w3IsEmpty(this[k])) {
        r[k] = this[k];
      }

      return r;
    }, {});
  }

  /**
   * Retorna o objeto q sera realizado a consulta e tmb setado na URL
   */
  getQueryParams(): any {
    const data = this.getData();

    return Object.keys(data).reduce((r, k) => {
      r[k] = this.filterValue(data[k]);
      return r;
    }, data);
  }

  /**
   * RECEBE os parametros ainda em string passado pela URL
   *
   * @param params
   */
  setQueryParams(params): this {
    this.attrsArrayable().forEach(k => {
      if (typeof params[k] === "string") {
        this[k] = params[k]
          .split("|")
          .map(d => w3CheckIsNumeric(d))
          .filter(d => d);
      }
    });

    return this;
  }

  protected filterValue(v: any): any {
    if (w3IsEmpty(v)) {
      return null;
    } else if (Array.isArray(v)) {
      return v.join("|");
    } else {
      return v;
    }
  }
}
