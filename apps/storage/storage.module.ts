import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {W3StorageOption} from './models';
import {W3StorageService} from './storage.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: []
})
export class W3StorageModule {

    constructor(@Optional() @SkipSelf() parentModule: W3StorageModule) {
        if (parentModule) {
            throw new Error('W3StorageModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(options: W3StorageOption): ModuleWithProviders {
        return {
            ngModule: W3StorageModule,
            providers: [
                W3StorageService,
                {provide: W3StorageOption, useValue: options},
            ]
        };
    }

}
