import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  page: string = '';
  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null;

  constructor(private router: Router, private auth: AuthService) {

  }

  ngOnInit(): void {
      this.routes = this.router.config.map(conf => conf.path) as string[];

      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
        const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
        if (this.routes.includes(currentPage)) {
          this.page = currentPage;
        }
      });
      this.auth.isUserLoggedIn().subscribe(user => {
        console.log(user);
        this.loggedInUser = user;
      }, error => {
        console.error(error);
      });
  }

  logoutUser(_?: boolean) {
    this.auth.logout().then(() => {
      console.log('Logged out user successfully.');
    }).catch(error => {
      console.error(error);
    });
  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }
}
