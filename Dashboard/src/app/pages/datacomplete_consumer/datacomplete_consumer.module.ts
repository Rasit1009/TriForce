import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { Datacomplete_ConsumerComponent } from './datacomplete_consumer.component';
import { SolarComponent } from './solar/solar.component';
import { FormComponent } from './form/form.component';
import { ChangeEmail } from './changeemail/changeemail.component';
import { HttpModule } from '@angular/http';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    ToasterModule
  ],
  declarations: [
    Datacomplete_ConsumerComponent,
    SolarComponent,
    FormComponent,
    ChangeEmail,
  ]
})
export class Datacomplete_ConsumerModule { }
