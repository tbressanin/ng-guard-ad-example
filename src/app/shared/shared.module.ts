import { PagesModule } from './../pages/pages.module';
import { MaterialModule } from './layout/material.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    PagesModule
  ],
  exports: [
    MaterialModule,
    PagesModule,
  ],
  providers: []
})
export class SharedModule { }
