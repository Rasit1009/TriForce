import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../../@theme/theme.module';
import { ConsumerComponent } from './consumer.component';
import { TeamComponent } from './team/team.component';
import { KittenComponent } from './kitten/kitten.component';
import { SecurityCamerasComponent } from './security-cameras/security-cameras.component';
import { WeatherComponent } from './weather/weather.component';
/** import { SolarComponent } from './solar/solar.component'; */
import { TrafficComponent } from './traffic/traffic.component';
import { TrafficChartComponent } from './traffic/traffic-chart.component';
import { ModalModule } from './modal/modal.module';
import { ToasterModule } from 'angular2-toaster';


@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    ModalModule,
    ToasterModule
  ],
  declarations: [
    ConsumerComponent,
    TeamComponent,
    KittenComponent,
    SecurityCamerasComponent,
    WeatherComponent,
  /**  SolarComponent, */
    TrafficComponent,
    TrafficChartComponent,
  ],  exports: [
    ConsumerComponent
  ]
})
export class ConsumerModule { }
