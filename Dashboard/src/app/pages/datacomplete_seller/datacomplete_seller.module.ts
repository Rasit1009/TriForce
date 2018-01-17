import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';
import { FileUploadModule } from 'ng2-file-upload';



import { ThemeModule } from '../../@theme/theme.module';
import { Datacomplete_SellerComponent } from './datacomplete_seller.component';
import { SolarComponent } from './solar/solar.component';
import { FormComponent } from './form/form.component';
import { ChangeEmail } from './changeemail/changeemail.component';

@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    FileUploadModule,
  ],
  declarations: [
    Datacomplete_SellerComponent,
    SolarComponent,
    FormComponent,
    ChangeEmail,
  ]
})
export class Datacomplete_SellerModule { }
