import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import {
  NotificationActions,
  NotificationActionsTypes
} from "./notification.actions";
import { W3MetaPagination } from "../../../services/request.model";

export interface NotificationState extends EntityState<Notification> {
  loading: boolean;
  loaded: boolean;
  error: any;
  search: any;
  pagination: W3MetaPagination;
  currentNotification: any;
}

export const notificationAdapter: EntityAdapter<
  Notification
> = createEntityAdapter<Notification>({
  sortComparer: false
});

export const initialState: NotificationState = notificationAdapter.getInitialState(
  {
    loading: false,
    loaded: false,
    error: null,
    search: {
      page: 1,
      paginate: 15,
      include: null,
      q: null
    },
    pagination: null,
    currentNotification: null
  }
);

export function notificationReducer(
  state = initialState,
  action: NotificationActions
): NotificationState {
  switch (action.type) {
    case NotificationActionsTypes.NewNotification: {
      return {
        ...notificationAdapter.addOne(action.payload.notification, state),
        loading: false,
        error: null,
        currentNotification: action.payload.notification
      };
    }

    case NotificationActionsTypes.SearchNotifications: {
      return {
        ...state,
        loading: true
      };
    }

    case NotificationActionsTypes.LoadNotifications: {
      return {
        ...notificationAdapter.addAll(action.payload.notifications, state),
        loading: false
      };
    }

    default: {
      return state;
    }
  }
}
