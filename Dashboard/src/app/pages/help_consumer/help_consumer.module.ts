import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { HttpModule } from '@angular/http';
import { Help_ConsumerComponent } from './help_consumer.component';

@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
  ],
  declarations: [
    Help_ConsumerComponent,
  ]
})
export class Help_ConsumerModule { }
