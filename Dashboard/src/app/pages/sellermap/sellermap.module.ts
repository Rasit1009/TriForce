import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';
import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';

import { ThemeModule } from '../../@theme/theme.module';
import { SellermapComponent } from './sellermap.component';

@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
     LeafletModule,
    AgmCoreModule.forRoot({
      
           apiKey: 'AIzaSyC9OU-R0bXKXldqsosq5aJFEeIui7vtXHc'})

  ],
  declarations: [
    SellermapComponent,
  ],
})
export class SellermapModule { }
