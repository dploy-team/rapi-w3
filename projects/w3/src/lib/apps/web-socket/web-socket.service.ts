import { Injectable } from '@angular/core';

import { W3StorageService } from '@rapi/w3/apps/storage';

import Echo from 'laravel-echo';
import { environment } from '@env/environment';
import { W3Notification } from './notification';

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

@Injectable()
export class WebSocketService {
    private _echo;
    private _channels: string[] = [];

    constructor(private storage: W3StorageService) {}

    get echo(): any {
        return this._echo;
    }

    connect(): WebSocketService {
        if (this._echo) {
            return this;
        }

        const token = this.storage.get('access_token');

        this._echo = new Echo({
            broadcaster: 'pusher',
            key: environment.SOCKET_KEY,
            cluster: environment.SOCKET_CLUSTER,
            authEndpoint: environment.URL_SOCKET + '/broadcasting/auth',
            logToConsole: true,
            auth: {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        });

        console.log('Init Listen->', this._channels);

        return this;
    }

    joinChannel<T>(channel: string): SwInChannel<T> {
        this._channels.push(channel);
        return this._echo.join(channel);
    }

    createPrivateChannel(channel: string): SwChannel {
        this._channels.push(channel);
        return this._echo.private(channel);
    }

    createPublicChannel(channel: string): SwChannel {
        this._channels.push(channel);
        return this._echo.channel(channel);
    }

    leave(ch: SwChannel): void {
        if (this._echo) {
            this._echo.leave(ch.name);
        }
    }

    reset(): void {
        if (this._echo) {
            this._channels.map(ch => this._echo.leave(ch));
            this._echo = null;
            this._channels = [];
        }
    }
}
