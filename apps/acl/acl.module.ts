import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AclTesteComponent} from './acl-teste/acl-teste.component';
import {W3AclCanDirective} from './w3-acl-can.directive';
import {W3AclRoleDirective} from './w3-acl-role.directive';
import {W3AclService} from './acl.service';
import {W3RequestAclService} from './request-acl.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AclTesteComponent,
        W3AclCanDirective,
        W3AclRoleDirective
    ],
    providers: [
        W3AclService,
        W3RequestAclService
    ],
    exports: [
        W3AclCanDirective,
        W3AclRoleDirective
    ]
})
export class W3AclModule {
}
