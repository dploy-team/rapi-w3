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
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from "@ngx-translate/core";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/");
}

export function TranslateFactory(translate: TranslateService) {
  const service = new TranslatedMatPaginatorIntl();
  service.injectTranslateService(translate);
  return service;
}

export const translate = TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
});

export const provider = {
  provide: MatPaginatorIntl,
  useFactory: TranslateFactory,
  deps: [TranslateService]
};

@NgModule({
  imports: [CommonModule, MatPaginatorModule, MatSnackBarModule],
  declarations: [W3PaginatorComponent, W3PhonePipe, W3WeekDayPipe],
  exports: [W3PaginatorComponent, W3PhonePipe, W3WeekDayPipe],
  providers: [provider]
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
