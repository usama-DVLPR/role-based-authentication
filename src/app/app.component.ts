import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'authentication';
  isMenuRequire = false;
  constructor(private router: Router, private toastr: ToastrService) {}

  ngDoCheck(): void {
    let currentUrl = this.router.url;

    if (currentUrl === '/login' || currentUrl === '/register') {
      this.isMenuRequire = false;
    } else {
      this.isMenuRequire = true;
    }
  }
  logout() {
    sessionStorage.clear();

    this.router.navigate(['/login']);
  }
}
