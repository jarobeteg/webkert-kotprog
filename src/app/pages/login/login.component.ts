import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = new FormControl<string>('');
  password = new FormControl<string>('');

  login() {
    console.log('Username:', this.email.value);
    console.log('Password:', this.password.value);
  }
}
