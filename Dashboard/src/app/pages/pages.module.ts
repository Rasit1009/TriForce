import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { Dashboard1Module } from './dashboard1/dashboard1.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { Datacomplete_SellerModule } from './datacomplete_seller/datacomplete_seller.module';
import { Datacomplete_ConsumerModule } from './datacomplete_consumer/datacomplete_consumer.module';
import { QrscanModule } from './qrscan/qrscan.module';
import { QrgenerateModule } from './qrgenerate/qrgenerate.module';
import { TabsModule } from './qrscan/tabs/tabs.module';
import { SellermapModule } from './sellermap/sellermap.module';
import { SellerOverviewModule } from './seller-overview/seller-overview.module';
import { ScChoiceModule } from './sc-choice/sc-choice.module';
import { TestComponent } from './test/test.component';
import { Dashboard2Module } from './dashboard2/dashboard2.module';
import { CouponsettingModule } from './couponsetting/couponsetting.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    Dashboard1Module,
    Dashboard2Module,
    Datacomplete_SellerModule,
    Datacomplete_ConsumerModule,
    QrscanModule,
    QrgenerateModule,
    TabsModule,
    SellermapModule,
    SellerOverviewModule,
    ScChoiceModule,
    CouponsettingModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
