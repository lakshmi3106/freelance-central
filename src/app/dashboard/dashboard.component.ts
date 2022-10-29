import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetails:any;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user !== null) {
      
        this.userDetails = JSON.parse(user);
        console.log(this.userDetails.providerData[0].photoURL)
        // console.log("Sign-in provider: " + profile.providerId);
        // console.log("  Provider-specific UID: " + profile.uid);
        // console.log("  Name: " + profile.displayName);
        // console.log("  Email: " + profile.email);
        // console.log("  Photo URL: " + profile.photoURL);
    }
    else{
      this.router.navigateByUrl('login')
    }
      
     
  }

  logOut(){
    this.authService.logOut();
  }

}
