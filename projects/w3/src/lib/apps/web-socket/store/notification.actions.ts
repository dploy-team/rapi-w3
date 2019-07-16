import { Action } from '@ngrx/store';

export enum NotificationActionsTypes {
    // REQUESTS API
    NewNotification = '[Notification] New Notification',
    SearchNotifications = '[Notification] Search Notification',
    LoadNotifications = '[Notification] Load Notification',
    MarkAsRead = '[Notification] Mark as read'
}

export class NewNotification implements Action {
    readonly type = NotificationActionsTypes.NewNotification;

    constructor(public payload: { notification: any }) {}
}

export class SearchNotifications implements Action {
    readonly type = NotificationActionsTypes.SearchNotifications;

    constructor(public payload: { params: any }) {}
}

export class LoadNotifications implements Action {
    readonly type = NotificationActionsTypes.LoadNotifications;

    constructor(public payload: { notifications: any[] }) {}
}

export class MarkAsRead implements Action {
    readonly type = NotificationActionsTypes.MarkAsRead;

    constructor() {}
}

export type NotificationActions =
    | NewNotification
    | SearchNotifications
    | LoadNotifications
    | MarkAsRead;
