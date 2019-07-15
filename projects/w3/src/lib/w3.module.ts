import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  MatPaginatorIntl,
  MatPaginatorModule,
  MatSnackBarModule
} from "@angular/material";
import { W3StorageOption } from "./apps/storage/models";
import { TranslatedMatPaginatorIntl } from "./components/w3-paginator/pt-br-paginator-intl";

import { W3PaginatorComponent } from "./components/w3-paginator/w3-paginator.component";

import { W3StorageService } from "./apps/storage/storage.service";
import { W3PhonePipe } from "./pipes/w3-phone.pipe";
import { W3WeekDayPipe } from "./pipes/w3-week-day.pipe";
import { W3_CONFIG, W3Config } from "./w3.config";

@NgModule({
  imports: [CommonModule, MatPaginatorModule, MatSnackBarModule],
  declarations: [W3PaginatorComponent, W3PhonePipe, W3WeekDayPipe],
  exports: [W3PaginatorComponent, W3PhonePipe, W3WeekDayPipe],
  providers: [
    { provide: MatPaginatorIntl, useClass: TranslatedMatPaginatorIntl }
  ]
})
export class W3Module {
  static forRoot(configs: W3Config): ModuleWithProviders {
    return {
      ngModule: W3Module,
      providers: [
        W3StorageService,

        { provide: W3_CONFIG, useValue: configs },
        { provide: W3StorageOption, useValue: configs.storage }
        // HttpErrorEvent,
      ]
    };
  }
}
