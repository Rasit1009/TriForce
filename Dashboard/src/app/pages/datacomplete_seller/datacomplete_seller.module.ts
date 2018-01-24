import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';
import { FileUploadModule } from 'ng2-file-upload';



import { ThemeModule } from '../../@theme/theme.module';
import { Datacomplete_SellerComponent } from './datacomplete_seller.component';
import { SolarComponent } from './solar/solar.component';
import { FormComponent } from './form/form.component';
import { ChangeEmail } from './changeemail/changeemail.component';
import { LogoUrlComponent } from './logo-url/logo-url.component';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    FileUploadModule,
    ToasterModule
  ],
  declarations: [
    Datacomplete_SellerComponent,
    SolarComponent,
    FormComponent,
    ChangeEmail,
    LogoUrlComponent,
  ],
  exports: [
    Datacomplete_SellerComponent,
  ]
})
export class Datacomplete_SellerModule { }
