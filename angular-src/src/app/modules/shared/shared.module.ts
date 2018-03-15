import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCarouselModule } from 'ngx-carousel';

@NgModule({
  imports: [
    CommonModule,
    NgxCarouselModule
  ],
  declarations: [],
  exports: [ NgxCarouselModule ]
})
export class SharedModule { }
