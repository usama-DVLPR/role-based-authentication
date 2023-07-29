import { UpdatepopupComponent } from './../updatepopup/updatepopup.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css'],
})
export class UserlistingComponent implements OnInit {
  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'userName',
    'name',
    'email',
    'role',
    'status',
    'action',
  ];
  constructor(private _authService: AuthService, private dailog: MatDialog) {}
  ngOnInit(): void {
    this.loadUser();
  }
  loadUser() {
    this._authService.getAllUsers().subscribe((res: any) => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
    });
  }

  updatePopup(id: any) {
    // console.log(id);
    this.openDailog('400ms', '600ms', id);
  }

  openDailog(enterAnimation: any, exitAnimation: any, id: any) {
    const popup = this.dailog.open(UpdatepopupComponent, {
      enterAnimationDuration: enterAnimation,
      exitAnimationDuration: exitAnimation,
      data: {
        id,
      },
    });
    popup.afterClosed().subscribe((res: any) => {
      this.loadUser();
    });
  }
}
