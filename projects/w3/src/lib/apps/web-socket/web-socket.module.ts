import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { W3WebSocketService } from "./web-socket.service";
import { NotificationStoreModule } from "./store/notification-store.module";

/**
 * Módulo de WebSocket
 */
@NgModule({
  imports: [CommonModule, NotificationStoreModule],
  declarations: [],
  providers: [W3WebSocketService]
})
export class W3WebSocketModule {}
