import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Person } from '../../datacomplete_consumer/services/person.service';

@Component({
  selector: 'ngx-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
})
export class FormComponent {


  starRate = 2;
  heartRate = 4;
}
