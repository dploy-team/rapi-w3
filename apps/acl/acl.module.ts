import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {W3AclService} from './acl.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [
        W3AclService
    ]
})
export class W3AclModule {
}
