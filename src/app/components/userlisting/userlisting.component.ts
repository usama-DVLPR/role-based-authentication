import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css'],
})
export class UserlistingComponent {
  userList: any;
  dataSource: any;
  displayColumns:string[]=['userName','Name','Email','Status','Action']
  constructor(private _authService: AuthService) {}

  loadUser() {
    this._authService.getAllUsers().subscribe((res: any) => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
    });
  }
}
