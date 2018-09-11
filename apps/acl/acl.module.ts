import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {W3AclService} from './acl.service';
import { AclTesteComponent } from './acl-teste/acl-teste.component';
import {W3RequestAclService} from './request-acl.service';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [AclTesteComponent],
    providers: [
        W3AclService,
        W3RequestAclService
    ]
})
export class W3AclModule {
}
