import {Injectable} from '@angular/core';
import {W3StorageOption} from './models';
import {isObject, isString} from 'util';

@Injectable()
export class W3StorageService {

    private drive: Storage;

    constructor(private options: W3StorageOption) {
        console.log('W3StorageService.options->', options);
        this.drive = this.options.drive === 'SESSION' ? sessionStorage : localStorage;
    }

    private key(k): string {
        return (`${this.options.prefix}_${k}`).toLowerCase();
    }

    get(key: string, def: any = null): any {
        let value = this.drive.getItem(this.key(key)) || def;

        if (value && isString(value) && value.indexOf('json:') === 0) {
            value = JSON.parse(value.substr(5));
        }

        return value;
    }

    set(key: string, value: any): any {
        if (isObject(value)) {
            value = 'json:' + JSON.stringify(value);
        }

        return this.drive.setItem(this.key(key), value);
    }

    remove(key: string): void {
        this.drive.removeItem(this.key(key));
    }

}
