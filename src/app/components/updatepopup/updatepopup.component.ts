import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css'],
})
export class UpdatepopupComponent implements OnInit {
  roleList: any;
  editData: any;
  updateUserForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _authService: AuthService,
    private router: Router,
    private dialogref: MatDialogRef<UpdatepopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.updateUserForm = this.formBuilder.group({
      role: ['', Validators.required],
      isActive: [''],
    });
    this._authService.getAllRoles().subscribe((res: any) => {
      this.roleList = res;
    });
    if (this.data.id != null && this.data.id != '') {
      this.loadUserData(this.data.id);
      this._authService.getUserById(this.data.id).subscribe((res: any) => {
        this.editData = res;
      });
    }
  }

  loadUserData(id: any) {
    this._authService.getUserById(id).subscribe((res: any) => {
      this.updateUserForm.setValue({
        role: res.role,
        isActive: res.isActive,
      });
    });
  }

  updateUser() {
    if (this.updateUserForm.valid) {
      this.editData.role = this.updateUserForm.value.role;

      this.editData.isActive = this.updateUserForm.value.isActive;

      this._authService
        .updateUser(this.editData.id, this.editData)
        .subscribe((res: any) => {
          this.toastr.success('User Details Updated', 'Updated Successfully', {
            progressBar: true,
            closeButton: true,
          });
          this.dialogref.close();
        });
    } else {
      this.toastr.warning('Please Select Role for user', 'User role require', {
        progressBar: true,
        closeButton: true,
      });
    }
  }
}
