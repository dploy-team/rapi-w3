import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { W3AclService } from "./acl.service";
import { W3RequestAclService } from "./request-acl.service";
import { W3AclCanGuard } from "./guards/acl-can.guard";
import { W3AclRolesGuard } from "./guards/acl-roles.guard";
import { AclTesteComponent } from "./acl-teste/acl-teste.component";
import { W3AclCanDirective } from "./directives/w3-acl-can.directive";
import { W3AclRoleDirective } from "./directives/w3-acl-role.directive";
import { W3NotificationModule } from "../notification/notification.module";

@NgModule({
  imports: [CommonModule, W3NotificationModule],
  declarations: [AclTesteComponent, W3AclCanDirective, W3AclRoleDirective],
  exports: [W3AclCanDirective, W3AclRoleDirective]
})
export class W3AclModule {
  // constructor(@Optional() @SkipSelf() parentModule: W3AclModule) {
  //     if (parentModule) {
  //         throw new Error('W3AclModule is already loaded. Import it in the AppModule only!');
  //     }
  // }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: W3AclModule,
      providers: [
        W3AclService,
        W3RequestAclService,
        W3AclCanGuard,
        W3AclRolesGuard
      ]
    };
  }
}
