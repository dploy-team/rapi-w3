//
// import { HttpParams } from '@angular/common/http';
// import { FormGroup } from '@angular/forms';
//
//
// export function toHttpParams2(obj: Object): HttpParams {
//     return Object.getOwnPropertyNames(obj)
//         .reduce((p: HttpParams, key) => p.set(key, obj[key]), new HttpParams());
// }
//
// export function getAllErrors(form: FormGroup) {
//     let hasError = false;
//     const result = Object.keys(form.controls).reduce((acc, key) => {
//         const control = form.get(key);
//         const errors = control instanceof FormGroup
//             ? this.getAllErrors(control)
//             : control.errors;
//         if (errors) {
//             acc[key] = errors;
//             hasError = true;
//         }
//         return acc;
//     }, {} as { [key: string]: any; });
//     console.log('has error' + form, result);
//
// }
//


import {Sort} from '@angular/material';

export interface EnumItem {
    value: string;
    key: string;
}

export function enumToArray(_enum): EnumItem[] {
    return Object.keys(_enum)
        .map(index => ({key: _enum[index], value: index} as EnumItem));
}


export function enumToArrayWithLabels(_enum, labels: string[]) {
    const newEnumArray = [];
    Object.keys(_enum).forEach((ob, i) => {
        console.log('i', i, ob)
        newEnumArray.push({key: _enum[ob], value: ob, label: (labels[i] ? labels[i] : ob)})
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
