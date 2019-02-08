/**
 page: 1,
 paginate: 15,
 include: null,
 q: null
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

    merge(params): void {
        Object.keys(params)
            .forEach(k => {
                this[k] = params[k];
            });
    }

    getParams(): any {
        return Object.keys(this)
            .reduce((r, c) => {
                const v = this.filter(this[c]);

                if (v !== null) {
                    r[c] = v;
                }

                return r;
            }, {});
    }

    protected isEmpty(v: any): boolean {
        return v === undefined || v === null || v === '';
    }

    filter(v: any): any {
        if (this.isEmpty(v)) {
            return null;
        } else if (Array.isArray(v)) {
            return v.join('|');
        } else {
            return v;
        }
    }
}
