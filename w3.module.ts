import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {W3PaginatorComponent} from './components/w3-paginator/w3-paginator.component';
import {MatPaginatorIntl, MatPaginatorModule, MatSnackBarModule} from '@angular/material';
import {PhonePipe} from './pipes/phone.pipe';
import {KeysPipe} from './pipes/keys.pipe';
import {W3WeekDayPipe} from './pipes/w3-week-day.pipe';
import {W3NotificationService} from './services/notifications.service';
import {W3AuthService} from './apps/auth/auth.service';
import {getPtBrPaginatorIntl} from './components/w3-paginator/pt-br-paginator-intl';


@NgModule({
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSnackBarModule,
  ],
  declarations: [
    W3PaginatorComponent,
    PhonePipe,
    KeysPipe,
    W3WeekDayPipe,
  ],
  exports: [
    W3PaginatorComponent,
    PhonePipe,
    KeysPipe,
    W3WeekDayPipe
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPtBrPaginatorIntl() }
  ]
})
export class W3Module {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: W3Module,
      providers: [
        W3NotificationService,
        W3AuthService,
        // HttpErrorEvent,
        // AuthService,
        // AppEnv,
        // //LoggedInGuard,
        // // LeaveOrderGuard,
        // // { provide: GUARD_MANAGE, useClass: GuardManage, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    };
  }
}
