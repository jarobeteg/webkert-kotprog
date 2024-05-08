import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
    password_confirmation: new FormControl<string>('', Validators.required)
});

successMessage: string | null = null;
errorMessage: string | null = null;

  constructor(private router: Router, private auth: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.successMessage = null;
    this.errorMessage = null;
    this.registerForm.setValidators(this.passwordConfirmationValidator());
  }

  register() {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value as string;
      const password = this.registerForm.get('password')?.value as string;
      const username = this.registerForm.get('username')?.value as string;
      this.auth.register(email, password).then(cred => {
        const user: User = {
          id: cred.user?.uid as string,
          email: email,
          username: username
        };
        this.userService.create(user).then(_ => {
          this.successMessage = 'Profile registered successfully.';
          setTimeout(() => {}, 700);
        }).catch(error => {
          console.error(error);
          this.errorMessage = 'An error occurred during registration.';
        });
        this.auth.login(email, password).then(() => {
          this.successMessage = 'Logging in user... Redirecting to home page.';
          setTimeout(() => {
            this.router.navigate(['/home']); 
          }, 700);
        }).catch(loginError => {
          this.errorMessage = 'An error occurred while logging in after registration.';
        });
      }).catch(error => {
        let errorMessage = 'An error occurred during registration.';

        if (error.code) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              errorMessage = 'The provided email address is already in use.';
              break;
            case 'auth/weak-password':
              errorMessage = 'The password is too weak';
              break;
            case 'auth/invalid-email':
              errorMessage = 'The provided email address is not valid.';
              break;
          }
        }

        this.errorMessage = errorMessage;
      });
    } else if (this.registerForm.errors?.['passwordMismatch']) {
      this.errorMessage = 'The passwords do not match.';
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  passwordConfirmationValidator(): any {
    return (group: FormGroup) => {
      const password = group.get('password')?.value;
      const passwordConfirmation = group.get('password_confirmation')?.value;

      if (password !== passwordConfirmation) {
        group.get('password_confirmation')?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        return null;
      }
    };
  }
}
