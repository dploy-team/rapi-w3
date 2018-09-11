import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {W3AclService} from './acl.service';

@Directive({
    selector: '[W3AclCan]'
})
/**
 * use =>  *W3AclCan="array_permissions; op string_operador"
 * array_permissions = ['perm 1', 'perm 2']
 * string_operador (opcional) = 'AND' | 'OR' default: 'OR'
 * simple example =>  *W3AclCan="['read', 'delete']"
 * complete example =>  *W3AclCan="['read', 'delete']; op 'AND'"
 */
export class W3AclCanDirective {

    private permissions = [];
    private logicalOp = 'OR';

    constructor(private templateRef: TemplateRef<any>,
                private element: ElementRef,
                private acl: W3AclService,
                private viewContainer: ViewContainerRef) {
    }

    @Input()
    set W3AclCan(val) {
        if (!val.isArray) {
            this.permissions = [val];
        } else {
            this.permissions = val;
        }

        this.updateView();
    }

    @Input()
    set W3AclCanOp(permop) {
        this.logicalOp = permop;
        this.updateView();
    }


    private updateView(): void {
        if (this.checkPermissions()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

    private checkPermissions(): boolean {
        return this.acl.can(this.makeStringPermission());
    }

    private makeStringPermission(): string {
        if (this.logicalOp === 'AND') {
            return this.permissions.join(',');
        } else {
            return this.permissions.join('|');
        }
    }
}
