import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";
import { W3AclService } from "../acl.service";
import { Subscription } from "rxjs";
import { AuthState } from "../../store/auth.reducer";
import { Store } from "@ngrx/store";
import { getCurrentAcl } from "../../store/auth.selectors";

/**
 * Passe um array de permissões que serão parseadas com as permissões do usuário logado, e verificar se deve ou não mostrar aquele elemento.
 * Ex:
 * @example
 * <element *w3AclCan="['read', 'delete']"></element>
 *
 */
@Directive({
  selector: "[w3AclCan]"
})
export class W3AclCanDirective implements OnInit, OnDestroy {
  /**
   *@ignore
   */
  private _last: boolean;

  /**
   * @ignore
   */
  private _perms: any;

  /**
   * @ignore
   */
  private _subject: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private acl: W3AclService,
    private viewContainer: ViewContainerRef,
    private store: Store<AuthState>
  ) {}

  /**
   *  Array de permissões
   */
  @Input()
  set w3AclCan(val: string[]) {
    this._perms = val;
    this.check();
  }

  /**
   * Faz um subscribe as mudanças de permissões do user logado
   */
  ngOnInit(): void {
    this._subject = this.store
      .select(getCurrentAcl)
      .subscribe(() => this.check());
  }

  ngOnDestroy(): void {
    this._subject.unsubscribe();
  }

  /**
   * Verifica as permissões
   */
  private check(): void {
    const newStatus = this.acl.can(this._perms);

    if (this._last !== newStatus) {
      this._last = newStatus;
      this.updateView();
    }
  }

  /**
   * Atualizar a visualização do elemento conforme permissões
   */
  private updateView(): void {
    if (this._last) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
