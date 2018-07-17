import {InjectionToken} from '@angular/core';


export * from './config';
export * from './responses/responses.model';

export const skipAuthorization = {headers: {skipAuthorization: '1'}};


// TOKENS
export const W3_MESSAGE_RESPONSE = new InjectionToken('W3_MESSAGE_RESPONSE');
