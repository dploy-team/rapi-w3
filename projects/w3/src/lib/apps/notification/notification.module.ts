import { NgModule } from "@angular/core";

import { MatButtonModule, MatDialogModule } from "@angular/material";
import { W3MatConfirmDialogComponent } from "./components/w3-mat-confirm-dialog/w3-mat-confirm-dialog.component";
import { W3NotificationService } from "./notifications.service";

/**
 * Módulo de notificação
 */
@NgModule({
  imports: [MatDialogModule, MatButtonModule],
  declarations: [W3MatConfirmDialogComponent],
  exports: [W3MatConfirmDialogComponent],
  entryComponents: [W3MatConfirmDialogComponent],
  providers: [W3NotificationService]
})
export class W3NotificationModule {}
