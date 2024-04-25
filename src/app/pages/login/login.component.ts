import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = new FormControl<string>('');
  password = new FormControl<string>('');

  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  async login() {
    this.loading = true;

    this.authService.login(this.email.value as string, this.password.value as string).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/home');
      this.loading = false;
    }).catch(error => {
      console.error(error);
      this.loading = false;
    });
  }
}
