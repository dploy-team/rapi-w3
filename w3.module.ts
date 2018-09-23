import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatPaginatorIntl, MatPaginatorModule, MatSnackBarModule} from '@angular/material';

import {W3AuthService} from './apps/auth';
import {W3NotificationService} from './services/notifications.service';
import {PhonePipe} from './pipes/phone.pipe';
import {KeysPipe} from './pipes/keys.pipe';
import {W3WeekDayPipe} from './pipes/w3-week-day.pipe';
import {getPtBrPaginatorIntl} from './components/w3-paginator/pt-br-paginator-intl';
import {W3PaginatorComponent} from './components/w3-paginator/w3-paginator.component';
import {W3StorageOption, W3StorageService} from './apps/storage';
import {W3_CONFIG, W3Config} from './w3.config';
import {W3MeService} from "./apps/auth/me.service";


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
        W3StorageService,
        {provide: MatPaginatorIntl, useValue: getPtBrPaginatorIntl()}
    ]
})
export class W3Module {

    // constructor(@Optional() @SkipSelf() parentModule: W3Module) {
    //     if (parentModule) {
    //         throw new Error('W3Module is already loaded. Import it in the AppModule only!');
    //     }
    // }

    static forRoot(configs: W3Config): ModuleWithProviders {

        return {
            ngModule: W3Module,
            providers: [
                W3NotificationService,
                W3AuthService,

                {provide: W3_CONFIG, useValue: configs},
                {provide: W3StorageOption, useValue: configs.storage},
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
