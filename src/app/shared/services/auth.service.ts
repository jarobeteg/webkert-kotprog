import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  deleteUser() {
    this.auth.currentUser.then(user => {
      if(user) {
        user.delete().then(() => {

        }).catch(error => {
          console.error(error);
        });
      } else {
        console.error('No user currently signed in!');
      }
    }).catch(error => {
      console.error(error);
    });
  }

  logout() {
    return this.auth.signOut();
  }
}
