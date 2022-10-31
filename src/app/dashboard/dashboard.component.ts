import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogContent } from './dialog/dialog.component';
import {  FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/use.service';
//import { MatPaginator } from '@angular/material/paginator';


export interface PeriodicElement {
  name: string;
  id: string;
  email: number;
  phoneNo: string;
  address: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetails: any;
  allUsers: any = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource([]);
  userForm: FormGroup | undefined;
  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;

  constructor(private authService: AuthService, private router: Router,
    public dialog: MatDialog, private userService: UserService,

  ) { }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.authService.getUserStatus();
    this.authService.userDetails.subscribe(obj => {
      this.userDetails = obj;
      this.getUsers();
    })
    this.displayedColumns = [ 'name', 'email', 'phoneNo', 'address', 'actions'];

  }

  getUsers() {
    this.userService.getAllUsers().then(users => {
      this.allUsers = users;
      this.dataSource.data = this.allUsers;
    });

  }

  logOut() {
    this.authService.logOut();
  }

  delete(el: PeriodicElement) {

    this.userService.deleteUser(el.id).then(res => {
      this.getUsers();
    })
      .catch(error => {
        alert('unable to delete')
      })
  }

  openDialog(el: any, action: string) {
    const dialogRef = this.dialog.open(DialogContent, {
      data: { action: action, user: el },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getUsers();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateAllComplete(id:string){
    console.log(id)
  }

}
