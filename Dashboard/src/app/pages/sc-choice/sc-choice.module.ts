import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';





import { ScChoiceComponent } from './sc-choice.component';

@NgModule({
  imports: [
    CommonModule, 
    ThemeModule,
  ],
  declarations: [
    ScChoiceComponent,
  ],
  exports: [
    ScChoiceComponent,
  ]
})
export class ScChoiceModule { }
