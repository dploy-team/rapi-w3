import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {W3AclService} from './acl.service';
import {Subscription} from 'rxjs';

@Directive({
    selector: '[w3AclRole]'
})

/**
 * use =>  *W3AclRole="array_roles;"
 * array_roles = ['role 1', 'role 2']
 * simple example =>  *W3AclRole="['admin', 'editor']"
 */
export class W3AclRoleDirective implements OnInit, OnDestroy {

    private _last: boolean;
    private _role: any;
    private _subject: Subscription;

    constructor(private templateRef: TemplateRef<any>,
                private acl: W3AclService,
                private viewContainer: ViewContainerRef) {
    }

    @Input()
    set w3AclRole(val) {
        this._role = val;
        this.check();
    }

    ngOnInit(): void {
        this._subject = this.acl.onChange$
            .subscribe(() => this.check());
    }

    ngOnDestroy(): void {
        console.log('W3AclRoleDirective.ngOnDestroy');
        this._subject.unsubscribe();
    }

    private check(): void {
        const newStatus = this.acl.hasRole(this._role);

        if (this._last !== newStatus) {
            this._last = newStatus;
            this.updateView();
        }
    }

    private updateView(): void {
        if (this._last) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

}
