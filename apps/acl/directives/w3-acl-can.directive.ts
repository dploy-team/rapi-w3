import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {W3AclService} from '../acl.service';
import {Subscription} from 'rxjs';

@Directive({
    selector: '[w3AclCan]'
})
/**
 * use =>  *w3AclCan="array_permissions; "
 * array_permissions = ['perm 1', 'perm 2']
 * simple example =>  *w3AclCan="['read', 'delete']"
 */
export class W3AclCanDirective implements OnInit, OnDestroy {

    private _last: boolean;
    private _perms: any;
    private _subject: Subscription;

    constructor(private templateRef: TemplateRef<any>,
                private acl: W3AclService,
                private viewContainer: ViewContainerRef) {
    }

    @Input()
    set w3AclCan(val) {
        this._perms = val;
        this.check();
    }

    ngOnInit(): void {
        this._subject = this.acl.onChange$
            .subscribe(() => this.check());
    }

    ngOnDestroy(): void {
        console.log('W3AclCanDirective.ngOnDestroy');
        this._subject.unsubscribe();
    }

    private check(): void {
        const newStatus = this.acl.can(this._perms);

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
