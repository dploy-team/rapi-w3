import { Injectable } from "@angular/core";

import Echo from "laravel-echo";
import { environment } from "@env/environment";
import { W3Notification } from "./notification";
import { W3StorageService } from "../storage/storage.service";

interface DataObj {
  [key: string]: any;
}

export interface SwChannel {
  name: string;

  listen(event: string, func: (e) => void): SwChannel;
  notification(func: (e: W3Notification) => void): SwChannel;
}

export interface SwInChannel<T> extends SwChannel {
  here(func: (users: T[]) => void): SwInChannel<T>;

  joining(func: (user: T) => void): SwInChannel<T>;

  leaving(func: (user: T) => void): SwInChannel<T>;

  listenForWhisper(
    eventName: string,
    func: (e: DataObj) => void
  ): SwInChannel<T>;

  whisper(eventName: string, e: T): SwInChannel<T>;
}

/**
 * Service para conexões por Socket.
 * [Laravel Echo]{@link https://github.com/laravel/echo}
 *
 *
 *
 * @example
 * const options: Echo = new Echo({
 *                   broadcaster: 'pusher',
 *                   key: 'asd75gasd581as',
 *                   cluster: 'us2',
 *                   authEndpoint: 'myapi/broadcasting/auth',
 *                   logToConsole: true,
 *                   auth: {
 *                       headers: {
 *                       Authorization: 'Bearer ...'
 *                   }
 *                 }
 * });
 *
 * ngOnInit(){
 *                   this.socket.connect(options);
 *
 *                   const channel = this.socket.createPrivateChannel(`MeuCanal.User.${userId}`)
 *
 *                   channel.listen(`MeuCanal.User.${userId}`, e => {
 *                                      console.log('novo evento')
 *                   })
 *
 *                   channel.notification(n: W3Notification) => {
 *                                       console.log('nova notificação')
 *                   }
 *
 * }
 */
@Injectable()
export class W3WebSocketService {
  private _echo;
  private _channels: string[] = [];

  constructor(private storage: W3StorageService) {}

  get echo(): any {
    return this._echo;
  }

  /**
   *
   * @param connectOptions Instancia do LaravelEcho
   */
  connect(connectOptions: Echo): W3WebSocketService {
    if (this._echo) {
      return this;
    }

    const token = this.storage.get("access_token");

    // this._echo = new Echo({
    //     broadcaster: 'pusher',
    //     key: environment.SOCKET_KEY,
    //     cluster: environment.SOCKET_CLUSTER,
    //     authEndpoint: environment.URL_SOCKET + '/broadcasting/auth',
    //     logToConsole: true,
    //     auth: {
    //         headers: {
    //             Authorization: 'Bearer ' + token
    //         }
    //     }
    // });

    console.log("Init Listen->", this._channels);

    return this;
  }

  /**
   *
   * @param channel Nome do canal ao qual deseja receber eventos
   */
  joinChannel<T>(channel: string): SwInChannel<T> {
    this._channels.push(channel);
    return this._echo.join(channel);
  }

  /**
   * Método para criação de novo canal privado
   * @param channel nome do canal
   */
  createPrivateChannel(channel: string): SwChannel {
    this._channels.push(channel);
    return this._echo.private(channel);
  }

  /**
   * Método para criação de novo canal público
   * @param channel nome do canal
   */
  createPublicChannel(channel: string): SwChannel {
    this._channels.push(channel);
    return this._echo.channel(channel);
  }

  /**
   * cancelar recebimento de informação do canal
   * @param ch
   */
  leave(ch: SwChannel): void {
    if (this._echo) {
      this._echo.leave(ch.name);
    }
  }

  /**
   * Sair de todos os canais
   */
  reset(): void {
    if (this._echo) {
      this._channels.map(ch => this._echo.leave(ch));
      this._echo = null;
      this._channels = [];
    }
  }
}
