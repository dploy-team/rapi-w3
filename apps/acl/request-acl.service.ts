import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {ResponseItem} from '@rapi/w3';
import {W3AclService} from '@rapi/w3/apps/acl/acl.service';
import {DataAclModel, ResponseAclData} from '@rapi/w3/apps/acl/acl.model';

import {environment} from '@env/environment';

@Injectable()
export class W3RequestAclService {

    constructor(private http: HttpClient, private acl: W3AclService) {
    }

    findData(): Observable<ResponseAclData> {
        return this.http.get<ResponseItem<ResponseAclData>>(`${environment.URL_API}/rapi/guardian/me/acl`)
            .pipe(
                map(result => result.data)
            );
    }

    allPerms(): string[] {
        return [''];
    }

    refresh(): void {// : Observable<ResponseAclData>
        console.log('W3RequestAcl.refresh');

        this.findData()
            .pipe(
                tap(data => this.fillAcl(data))
            )
            .subscribe();
    }

    private fillAcl(data: ResponseAclData): void {
        const newData = {
            roles: data.roles.map(r => r.name),
            perms: data.permissions.map(r => r.name),
        } as DataAclModel;

        this.acl.setData(newData);
    }
}
