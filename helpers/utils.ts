import {Sort} from '@angular/material';

export interface EnumItem {
    key: string | number;
    value: any;
    label?: string;
}

export function enumToArray(_enum): EnumItem[] {
    return Object.keys(_enum)
        .map(index => ({key: _enum[index], value: index} as EnumItem));
}

export function enumToArrayWithLabels(_enum, labels: string[]): EnumItem[] {
    const newEnumArray = [];
    Object.keys(_enum).forEach((ob, i) => {
        newEnumArray.push({key: _enum[ob], value: ob, label: (labels[i] ? labels[i] : ob)});
    });
    return newEnumArray;
}

export function makeSortParams(sort: Sort, def: string): string {

    if (sort.direction === 'asc') {
        return `${sort.active}`;

    } else if (sort.direction === 'desc') {
        return `-${sort.active}`;

    } else {
        return def;
    }

}

export function jsonEqual(current, next, debug?: boolean): boolean {
    const cj = JSON.stringify(current);
    const nj = JSON.stringify(next);

    if (debug === true) {
        console.log('jsonEqual.debug', cj === nj, 'OLD', cj, 'NEW', nj);
    }

    return cj === nj;
}

export function w3CheckIsNumeric(v): boolean {
    const r = new RegExp(/^(\d+)$/);
    return r.test(v) ? +v : v;
}

export function w3IsEmpty(v: any): boolean {
    return v === undefined || v === null || v === '' || v.length === 0;
}
