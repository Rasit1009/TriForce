import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { HttpModule } from '@angular/http';
import { Help_SellerComponent } from './help_seller.component';

@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
  ],
  declarations: [
    Help_SellerComponent,
  ]
})
export class Help_SellerModule { }
