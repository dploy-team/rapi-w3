import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NotificationState } from "./notification.reducer";

export const getNotificationState = createFeatureSelector<NotificationState>(
  "notification"
);

export const getNotifications = createSelector(
  getNotificationState,
  (state: NotificationState) => (state ? state.entities : [])
);

export const getNotificationArr = createSelector(
  getNotifications,
  entities =>
    Object.keys(entities).map(id => {
      return entities[id];
    })
);

export const getNewNotificationsNumber = createSelector(
  getNotificationArr,
  entities => entities.filter(not => !not.read_at).length
);

export const getIsLoading = createSelector(
  getNotificationState,
  (state: NotificationState) => (state ? state.loading : [])
);
