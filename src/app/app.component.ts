import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'authentication';
  isMenuRequire = false;
  isAdmin = false;
  constructor(
    private _authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngDoCheck(): void {
    let currentUrl = this.router.url;

    if (currentUrl === '/login' || currentUrl === '/register') {
      this.isMenuRequire = false;
    } else {
      this.isMenuRequire = true;
    }
    if (this._authService.getUserRole() === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
  logout() {
    sessionStorage.clear();

    this.router.navigate(['/login']);
  }
}
