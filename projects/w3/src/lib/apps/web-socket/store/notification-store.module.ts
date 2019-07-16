import { NgModule } from "@angular/core";

// NGRX
import { StoreModule } from "@ngrx/store";

import { EffectsModule } from "@ngrx/effects";
import { notificationReducer } from "./notification.reducer";
import { NotificationEffects } from "./notification.effects";
import { W3NotificationModule } from "../../notification/notification.module";

@NgModule({
  imports: [
    W3NotificationModule,

    // NGRX
    StoreModule.forFeature("notification", notificationReducer),
    EffectsModule.forFeature([NotificationEffects])
  ]
})
export class NotificationStoreModule {}
