import {Injectable} from '@angular/core';
import {W3StorageOption} from './models';

@Injectable()
export class W3StorageService {

    private drive: Storage;

    constructor(private options: W3StorageOption) {
        console.log('W3StorageService.drive->', options.drive);
        this.drive = this.options.drive === 'SESSION' ? sessionStorage : localStorage;
    }

    private key(k): string {
        return (`${this.options.prefix}_${k}`).toLowerCase();
    }

    get(key: string, def: any = null): any {
        return this.drive.getItem(this.key(key)) || def;
    }

    set(key: string, value: any): any {
        return this.drive.setItem(this.key(key), value);
    }

    remove(key: string): void {
        this.drive.removeItem(this.key(key));
    }

}
