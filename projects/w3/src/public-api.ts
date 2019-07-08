/*
 * Public API Surface of w3
 */

// ACL
export {
  W3AclCanDirective
}from "./lib/apps/acl/directives/w3-acl-can.directive";
export { W3AclCanGuard } from "./lib/apps/acl/guards/acl-can.guard";
export { DataAclModel } from "./lib/apps/acl/acl.model";
export { Role } from "./lib/apps/acl/acl.model";
export { Permission } from "./lib/apps/acl/acl.model";
export { ResponseAclData } from "./lib/apps/acl/acl.model";
export { W3AclModule } from "./lib/apps/acl/acl.module";
export { W3AclService } from "./lib/apps/acl/acl.service";
export { W3RequestAclService } from "./lib/apps/acl/request-acl.service";

// Auth
export { W3AuthService } from './lib/apps/auth/auth.service';
export { W3MeService } from './lib/apps/auth/me.service';
export { W3AuthAbstractService } from './lib/apps/auth/auth-abstract.service';
export { W3PublicGuard } from './lib/apps/auth/guards/public.guard';
export { W3ProtectedGuard } from './lib/apps/auth/guards/protected.guard';
export {
  W3_AUTH_SERVICE,
  W3_PUBLIC_FALLBACK_PAGE_URI,
  W3_PROTECTED_FALLBACK_PAGE_URI
} from './lib/apps/auth/tokens';
export { W3AuthModule } from './lib/apps/auth/auth.module';
export { UserModel } from './lib/apps/auth/auth.model';
export { W3AuthInterceptor } from "./lib/apps/auth/auth.Interceptor";

// Notification
export {
  W3MatConfirmDialogComponent
}
  from "./lib/apps/notification/components/w3-mat-confirm-dialog/w3-mat-confirm-dialog.component";
export {
  W3NotificationModule
}from "./lib/apps/notification/notification.module";
export {
  W3NotificationService
}from "./lib/apps/notification/notifications.service";

// Storage
export { W3StorageOption } from "./lib/apps/storage/models";
export { w3StorageByLocalSession } from "./lib/apps/storage/models";
export { w3StorageByLocalStorage } from "./lib/apps/storage/models";
export { W3StorageService } from "./lib/apps/storage/storage.service";

// WebSocket
export { W3Notification } from "./lib/apps/web-socket/notification";
export { W3WebSocketModule } from "./lib/apps/web-socket/web-socket.module";
export { W3WebSocketService } from "./lib/apps/web-socket/web-socket.service";

// Paginator
export {
  W3PaginatorComponent
}from "./lib/components/w3-paginator/w3-paginator.component";

// Helpers
export { AbstractSearchParams } from "./lib/helpers/abstract-search-params";
export { W3ConfirmResponse } from "./lib/helpers/rxjs";
export { w3IsConfirmed } from "./lib/helpers/rxjs";
export {
  EnumItem,
  enumToArray,
  enumToArrayWithLabels,
  jsonEqual,
  makeSortParams,
  w3CheckIsNumeric,
  w3IsEmpty
} from "./lib/helpers/utils";
export { ValueAccessorBase } from "./lib/helpers/value-accessor";

// Interceptor
export { W3ApiToastInterceptor } from "./lib/interceptor/api-toast.Interceptor";
export {
  W3MessagesBaseResponseService
}from "./lib/interceptor/messages-base-response.service";
export {
  W3MessagesLv55ResponseService
}from "./lib/interceptor/messages-lv55-response.service";
export {
  W3MessagesLv56ResponseService
}from "./lib/interceptor/messages-lv56-response.service";
export { MessagesResponse } from "./lib/interceptor/messages-response";

// Pipes
export { W3PhonePipe } from "./lib/pipes/w3-phone.pipe";
export { W3WeekDayPipe } from "./lib/pipes/w3-week-day.pipe";

// Responses
export { MyHttpErrorResponse } from "./lib/responses/my-http-error";
export {
  DataUpload,
  CollectionResponse,
  FileReaderEvent,
  ItemRespDec,
  ItemResponse,
  ItemUploadResponse,
  Response20x,
  Response40x,
  ResponseCollection,
  ResponseItem
} from "./lib/responses/responses.model";

// Services
export {
  W3AbstractRequestService
}from "./lib/services/abstract-request.service";
export {
  HttpPostOptions, W3MetaPagination
}from "./lib/services/request.model";

//COnfig
export { W3_CONFIG, W3Config, w3ConfigDefault } from "./lib/w3.config";
export { W3Module } from "./lib/w3.module";
export {
  skipAuthorization,
  skipToast,
  skipToastAndAuthorization,
  W3_MESSAGE_RESPONSE,
  W3ConfigToast,
  W3Variables
} from "./lib/index"
