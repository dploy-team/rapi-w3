import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Observable, of } from "rxjs";

import { NotificationService } from "./notification.service";
import {
  SearchNotifications,
  NotificationActionsTypes,
  LoadNotifications,
  MarkAsRead
} from "./notification.actions";

@Injectable()
export class NotificationEffects {
  constructor(private actions$: Actions, private _api: NotificationService) {}

  @Effect()
  requestNotifications = this.actions$.pipe(
    ofType<SearchNotifications>(NotificationActionsTypes.SearchNotifications),
    mergeMap(action => {
      return this._api.search(action.payload.params).pipe(
        map(
          notifications =>
            new LoadNotifications({
              notifications: notifications
            })
        )
      );
    })
  );

  @Effect()
  markAsRead = this.actions$.pipe(
    ofType<MarkAsRead>(NotificationActionsTypes.MarkAsRead),
    mergeMap(action => {
      return this._api.markAllAsRead().pipe(
        map(
          () =>
            new SearchNotifications({
              params: { order: "-created_at" }
            })
        )
      );
    })
  );
}
