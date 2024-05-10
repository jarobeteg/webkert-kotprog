import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  loggedInUser?: firebase.default.User | null;
  loadingComplete: boolean = false;
  user: User | undefined;
  userEmail: string | undefined;
  username: string | undefined;

  constructor(private auth: AuthService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.auth.isUserLoggedIn().subscribe(defaultUser => {
      this.loggedInUser = defaultUser;
      this.userService.getById(this.loggedInUser?.uid as string).subscribe(user => {
        this.user = user;
        this.userEmail = user?.email;
        this.username = user?.username;
        this.loadingComplete = true;
      });
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
      this.loadingComplete = true;
    }, error => {
      localStorage.setItem('user', JSON.stringify('null'));
      this.loadingComplete = true;
    });
  }

  deleteProfile() {
    this.userService.delete(this.user?.id as string).then(_ => {
      this.auth.deleteUser();
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error(error);
    })
  }

  onUpdateUsername() {
    if (this.loggedInUser) {
      const dialog = this.dialog.open(UpdateDialogComponent, {
        data: {
          title: 'Update your username here!'
        }
      });

      dialog.componentInstance.dialogRef = dialog;

      dialog.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.updateUsername(result);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  updateUsername(newUsername: string) {
    if(this.user) {
      this.user.username = newUsername;
      this.userService.update(this.user).then(_ => {

      }).catch(error => {
        console.error(error);
      })
    } else {
      console.error('User is undefined!');
    }
  }
}
