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


export interface EnumItem {
  value: string;
  key: string;
}

export function enumToArray(_enum): EnumItem[] {
  return Object.keys(_enum)
    .map(index => ({key: _enum[index], value: index} as EnumItem));
}
