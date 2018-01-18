import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponsettingComponent } from './couponsetting.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [CouponsettingComponent],
  exports: [
    CouponsettingComponent,
  ]
})
export class CouponsettingModule { }
