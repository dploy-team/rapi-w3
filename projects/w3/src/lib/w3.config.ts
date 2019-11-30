import {w3StorageByLocalStorage, W3StorageOption} from './apps/storage/models';
import {InjectionToken} from '@angular/core';

export const W3_CONFIG = new InjectionToken('w3CustomConfig');

export interface W3Config {
    storage: W3StorageOption;
}

export const w3ConfigDefault: W3Config = {
    storage: w3StorageByLocalStorage
};
