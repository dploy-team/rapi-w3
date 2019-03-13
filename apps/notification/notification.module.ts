import {NgModule} from "@angular/core";

import {MatButtonModule, MatDialogModule} from "@angular/material";

import {W3MatConfirmDialogComponent} from "@rapi/w3/apps/notification/components/w3-mat-confirm-dialog/w3-mat-confirm-dialog.component";
import {W3NotificationService} from "@rapi/w3/apps/notification/notifications.service";

@NgModule({
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    declarations: [
        W3MatConfirmDialogComponent
    ],
    exports: [
        W3MatConfirmDialogComponent
    ],
    entryComponents: [
        W3MatConfirmDialogComponent
    ],
    providers: [
        W3NotificationService
    ]
})
export class W3NotificationModule {

}