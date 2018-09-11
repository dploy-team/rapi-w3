import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {W3AclService} from './acl.service';
import { AclTesteComponent } from './acl-teste/acl-teste.component';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [AclTesteComponent],
    providers: [
        W3AclService
    ]
})
export class W3AclModule {
}
