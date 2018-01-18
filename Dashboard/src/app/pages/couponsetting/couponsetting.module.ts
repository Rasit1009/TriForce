import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponsettingComponent } from './couponsetting.component';
import { ThemeModule } from '../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    ToasterModule
  ],
  declarations: [CouponsettingComponent],
  exports: [
    CouponsettingComponent,
  ]
})
export class CouponsettingModule { }
