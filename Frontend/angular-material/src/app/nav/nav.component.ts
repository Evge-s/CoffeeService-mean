import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';
import { TokenStorageService } from '../_services/token-storage.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  isDarkTheme: boolean = false;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private tokenStorageService: TokenStorageService,
    public loaderService: LoaderService) { }

  ngOnInit() {
    this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true : false;
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  storeThemeSelection() {
    localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light");
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
