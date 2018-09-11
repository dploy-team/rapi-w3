import {Component, OnInit} from '@angular/core';
import {W3AclService} from '../acl.service';
import {DataAclModel} from '../acl.model';
import * as _ from 'lodash';
import {W3RequestAclService} from '../request-acl.service';

@Component({
    selector: 'app-acl-teste',
    templateUrl: './acl-teste.component.html',
    styleUrls: ['./acl-teste.component.scss']
})
export class AclTesteComponent implements OnInit {

    public roles = ['admin', 'editor'];
    public perms = ['read', 'create', 'update', 'delete', 'guardian.user.create'];

    constructor(public acl: W3AclService, private _requestAcl: W3RequestAclService) {
    }

    ngOnInit(): void {
        this.active(['admin', 'editor']);
        // this._requestAcl .refresh().subscribe();
    }

    active(roles: string[]): void {

        const info = {
            'admin': ['create', 'update', 'delete'],
            'editor': ['read', 'update']
        };

        const data = {
            roles: [],
            perms: [],
        } as DataAclModel;


        roles.map(r => {
            data.roles.push(r);
            data.perms = data.perms.concat(info[r]);
        });

        data.perms = _.uniq(data.perms);

        this.acl.setData(data);
    }
}
