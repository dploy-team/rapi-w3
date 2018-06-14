import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { W3PaginatorComponent } from './components/w3-paginator/w3-paginator.component';
import {MatPaginatorModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatPaginatorModule,
  ],
  declarations: [
    W3PaginatorComponent
  ],
  exports: [
    W3PaginatorComponent
  ],
  entryComponents: [
   // W3PaginatorComponent
  ]
})
export class W3Module { }
