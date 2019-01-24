import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatPaginatorIntl, MatPaginatorModule, MatSnackBarModule} from '@angular/material';

import {W3NotificationService} from './services/notifications.service';
import {getPtBrPaginatorIntl, W3PaginatorComponent} from './components/w3-paginator';

import {W3StorageOption, W3StorageService} from './apps/storage';
import {W3KeysPipePipe, W3PhonePipe, W3WeekDayPipe} from './pipes';
import {W3_CONFIG, W3Config} from './w3.config';


@NgModule({
    imports: [
        CommonModule,
        MatPaginatorModule,
        MatSnackBarModule,
    ],
    declarations: [
        W3PaginatorComponent,
        W3PhonePipe,
        W3KeysPipePipe,
        W3WeekDayPipe,
    ],
    exports: [
        W3PaginatorComponent,
        W3PhonePipe,
        W3KeysPipePipe,
        W3WeekDayPipe
    ],
    providers: [
        {provide: MatPaginatorIntl, useValue: getPtBrPaginatorIntl()}
    ]
})
export class W3Module {

    static forRoot(configs: W3Config): ModuleWithProviders {
        return {
            ngModule: W3Module,
            providers: [
                W3StorageService,
                W3NotificationService,

                {provide: W3_CONFIG, useValue: configs},
                {provide: W3StorageOption, useValue: configs.storage},
                // HttpErrorEvent,
            ]
        };
    }

}
