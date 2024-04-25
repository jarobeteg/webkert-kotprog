import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required)
  });

  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  async login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value as string;
      const password = this.loginForm.get('password')?.value as string;
      this.authService.login(email, password).then(cred => {
        this.router.navigateByUrl('/home');
      }).catch(error => {
        let errorMessage = 'An error occurred during login.';

        if (error.code) {
          switch (error.code) {
            case 'auth/invalid-credential':
              errorMessage = 'Invalid email or password.';
              break;
            case 'auth/user-not-found':
              errorMessage = 'User not found. Please check your email and try again.';
              break;
            case 'auth/wrong-password':
              errorMessage = 'Invalid password. Please try again.';
              break;
            case 'auth/invalid-email':
              errorMessage = 'The provided email address is not valid.';
              break;
            case 'auth/too-many-requests':
              errorMessage = 'Too many unsuccessful login attempts. Please try again later.';
              break;
          }
        }

        this.errorMessage = errorMessage;
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
