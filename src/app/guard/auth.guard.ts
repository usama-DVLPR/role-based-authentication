import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class authGuard implements CanActivate {
  constructor(
    private toastr: ToastrService,
    private _authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this._authService.isLoggedIn()) {
      if (route.url.length > 0) {
        let menu = route.url[0].path;
        if (menu === 'user') {
          if (this._authService.getUserRole() === 'admin') {
            return true;
          } else {
            this.toastr.warning(
              'We are sorry, but you do not have the rights to access this data.',
              'Unauthorized',
              {
                progressBar: true,
                closeButton: true,
              }
            );
            this.router.navigate(['']);
            return false;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    }

    if (this._authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
