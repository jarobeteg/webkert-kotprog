import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  page: string = '';
  routes: Array<string> = [];

  constructor(private router: Router) {

  }

  ngOnInit(): void {
      this.routes = this.router.config.map(conf => conf.path) as string[];

      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
        const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
        if (this.routes.includes(currentPage)) {
          this.page = currentPage;
        }
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
