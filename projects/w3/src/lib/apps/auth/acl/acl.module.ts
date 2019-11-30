import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { W3AclService } from "./acl.service";
import { W3AclCanGuard } from "./guards/acl-can.guard";
import { W3AclCanDirective } from "./directives/w3-acl-can.directive";
import { W3NotificationModule } from "../../notification/notification.module";

/**
 * Módulo de ACL para controle de acesso
 */
@NgModule({
  imports: [CommonModule, W3NotificationModule],
  declarations: [W3AclCanDirective],
  exports: [W3AclCanDirective]
})
export class W3AclModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: W3AclModule,
      providers: [W3AclService, W3AclCanGuard]
    };
  }
}
