import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {W3PaginatorComponent} from './components/w3-paginator/w3-paginator.component';
import {MatPaginatorModule, MatSnackBarModule} from '@angular/material';
import {PhonePipe} from './pipes/phone.pipe';
import {KeysPipe} from './pipes/keys.pipe';
import {W3WeekDayPipe} from './pipes/w3-week-day.pipe';

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
        W3WeekDayPipe
    ],
    exports: [
        W3PaginatorComponent,
        PhonePipe,
        KeysPipe,
        W3WeekDayPipe
    ],
    entryComponents: [
        // W3PaginatorComponent
    ]
})
export class W3Module {
}
