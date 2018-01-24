import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { QrgenerateComponent } from './qrgenerate.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ToasterModule } from 'angular2-toaster';




@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    NgxQRCodeModule,
    ToasterModule,
  ],
  declarations: [
    QrgenerateComponent,
  ],
})
export class QrgenerateModule { }
