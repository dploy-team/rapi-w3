import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'W3KeysPipe'
})
export class W3KeysPipePipe implements PipeTransform {
    transform(value: any, args?: any[]): Object[] {
        return Object.keys(value);
        // const keyArr: any[] = Object.keys(value);
        // const dataArr = [];
        // const keyName = args[0];
        //
        // keyArr.forEach((key: any) => {
        //   value[key][keyName] = key;
        //   dataArr.push(value[key]);
        // });
        //
        // if (args[1]) {
        //   dataArr.sort((a: Object, b: Object): number => {
        //     return a[keyName] > b[keyName] ? 1 : -1;
        //   });
        // }
        //
        // console.log('PIPE', dataArr);
        // return dataArr;
    }
}