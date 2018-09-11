import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {W3AclService} from './acl.service';

@Directive({
  selector: '[W3AclRole]'
})

/**
 * use =>  *W3AclRole="array_roles; op string_operador"
 * array_roles = ['role 1', 'role 2']
 * string_operador (opcional) = 'AND' | 'OR' default: 'OR'
 * simple example =>  *W3AclRole="['admin', 'editor']"
 * complete example =>  *W3AclRole="['admin', 'editor']; op 'AND'"
 */
export class W3AclRoleDirective implements OnInit{

    private roles = [];
    private logicalOp = 'OR';

    constructor(private templateRef: TemplateRef<any>,
                private element: ElementRef,
                private acl: W3AclService,
                private viewContainer: ViewContainerRef) {
    }

    @Input()
    set W3AclRole(val) {
        if (!val.isArray) {
            this.roles = [val];
        } else {
            this.roles = val;
        }

        this.updateView();
    }

    @Input()
    set W3AclRoleOp(permop) {
        this.logicalOp = permop;
        this.updateView();
    }

    ngOnInit(): void {
        this.viewContainer.clear();
        this.updateView();
    }

    private updateView(): void {

        if (this.checkRole()) {
            this.viewContainer.createEmbeddedView(this.templateRef);

        } else {
            this.viewContainer.clear();
        }
    }

    private checkRole(): boolean {
        const text = this.makeStringPermission();
        return this.acl.hasRole(text);
    }

    private makeStringPermission(): string {
        if (this.logicalOp === 'AND') {
            return this.roles.join(',');
        } else {
            return this.roles.join('|');
        }
    }
}
