import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['Male'],
      role: [''],
      isActive: [false],
    });
  }
  ngOnInit(): void {}

  registration() {
    if (this.registrationForm.valid) {
      this._authService
        .registerUser(this.registrationForm.value)
        .subscribe((data: any) => {
          console.log(data);
          this.toastr.success(
            'User Registration Completed.',
            'Please contact with ADMIN '
          );
          this.router.navigate(['/login']);
        });
    } else {
      this.toastr.warning('Please Enter Valid Data');
    }
  }
}
