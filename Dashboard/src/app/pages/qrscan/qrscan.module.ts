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
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    ThemeModule,
    TabsModule,
    AngularEchartsModule,
    FormsModule,
    NgxZxingModule.forRoot(),
  ],
  declarations: [
    TabsComponent,
    QrscanComponent,
    ModalComponent,
  ],
  entryComponents: [
    ModalComponent,
  ],
})
export class QrscanModule { }
