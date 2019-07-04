import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketService } from './web-socket.service';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    providers: [WebSocketService]
})
export class WebSocketModule {}
