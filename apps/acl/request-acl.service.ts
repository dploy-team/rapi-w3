import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ItemRespDec} from '@rapi/w3';
import {Observable} from 'rxjs';

import {DataAclModel, ResponseAclData} from './acl.model';
import {environment} from '../../../../environments/environment';
import {map, tap} from 'rxjs/operators';
import {W3AclService} from './acl.service';

@Injectable()
export class W3RequestAclService {


    constructor(private http: HttpClient, private acl: W3AclService) {

    }

    findData(): Observable<ResponseAclData> {
        return this.http.get<ItemRespDec<ResponseAclData>>(`${environment.URL_API}/rapi/guardian/me/acl`)
            .pipe(
                map(result => result.data)
            );
    }

    allPerms(): string[] {
        return [''];
    }

    refresh(): Observable<ResponseAclData> {
        return this.findData()
            .pipe(
                tap(data => this.fillAcl(data))
            );
    }

    private fillAcl(data: ResponseAclData): void {
        const newData = {
            roles: data.roles.map(r => r.name),
            perms: data.permissions.map(r => r.name),
        } as DataAclModel;

        this.acl.setData(newData);
    }
}
