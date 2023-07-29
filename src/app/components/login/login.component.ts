import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;
  userData: any;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _authService: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', Validators.required],
    });
  }
  login() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);

      this._authService
        .getUserById(this.loginForm.value.userName)
        .subscribe((data: any) => {
          console.log(data);
          this.userData = data;
          if (this.userData.password === this.loginForm.value.password) {
            if (this.userData.isActive) {
              sessionStorage.setItem('userName', this.userData.id);
              sessionStorage.setItem('role', this.userData.role);
              this.router.navigate(['']);
              this.toastr.success('Login successfully', 'Welcome', {
                progressBar: true,
                closeButton: true,
              });
            } else {
              this.toastr.error('Please Contact with ADMIN', 'Login Failed', {
                progressBar: true,
                closeButton: true,
              });
            }
          } else {
            this.toastr.error(
              'Username or Password is invalid',
              'Login Failed',
              {
                progressBar: true,
                closeButton: true,
              }
            );
          }
        });
    } else {
      if (this.loginForm.value.userName) {
        this.toastr.warning('Please Enter Password', 'Password Required*', {
          progressBar: true,
          closeButton: true,
        });
      } else {
        this.toastr.warning('Please Enter Username', 'UserName Required*', {
          progressBar: true,
          closeButton: true,
        });
      }
    }
  }
}
