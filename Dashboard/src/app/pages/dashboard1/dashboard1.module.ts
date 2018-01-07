import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { Dashboard1Component } from './dashboard1.component';
import { ConsumerModule} from './consumer/consumer.module';
import { NgxQRCodeModule } from 'ngx-qrcode-coupon';
import { SellerModule } from './seller/seller.module';
import { ScChoiceModule } from '../sc-choice/sc-choice.module';
import { Dashboard2Module } from '../dashboard2/dashboard2.module';




@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    ConsumerModule,
    SellerModule,
    ScChoiceModule,
    Dashboard2Module,
    NgxQRCodeModule,
  ],
  declarations: [
    Dashboard1Component,

  ],
})
export class Dashboard1Module { }
