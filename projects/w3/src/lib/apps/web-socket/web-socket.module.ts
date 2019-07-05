import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { W3WebSocketService } from "./web-socket.service";

/**
 * Módulo de WebSocket
 */
@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [W3WebSocketService]
})
export class WebSocketModule {}
