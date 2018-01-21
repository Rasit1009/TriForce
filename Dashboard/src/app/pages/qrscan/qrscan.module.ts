import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { QrscanComponent } from './qrscan.component';
import { TabsComponent } from './tabs/tabs.component';


// Import the library
import { NgxZxingModule } from 'ngx-zxing';
// Needed as well
import { FormsModule } from "@angular/forms";
import { TabsModule } from './tabs/tabs.module';
import { ModalComponent } from './modal.component';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    ThemeModule,
    TabsModule,
    AngularEchartsModule,
    FormsModule,
    NgxZxingModule.forRoot(),
    ToasterModule
    
  ],
  declarations: [
    TabsComponent,
    QrscanComponent,
    ModalComponent,
  ],
  entryComponents: [
    ModalComponent,
  ], providers: [
    QrscanComponent
  ]
})
export class QrscanModule { }
