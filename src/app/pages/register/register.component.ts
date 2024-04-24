import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email = new FormControl<string>('');
  username = new FormControl<string>('');
  password = new FormControl<string>('');
  password_confirmation = new FormControl<string>('');

  register() {
    console.log("Email: ", this.email.value);
    console.log("Username: ", this.username.value);
    console.log("Password: ", this.password.value);
    console.log("Password_Confirmation: ", this.password_confirmation.value);
  }

}
