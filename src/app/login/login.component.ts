import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any;
  loginForm:FormGroup;
  errorMessage:string ='';
  constructor(private authService:AuthService,private fb: FormBuilder
    ,private router:Router) { 
  
  this.loginForm = this.fb.group({
    email: ['lakshmi3106@gmail.com', [Validators.required, Validators.email]],
    pwd: ['laks@123', [Validators.required, Validators.minLength(6)]],
    
  });
}

ngOnInit(): void {
 
}

getErrorMessage() {
  if (this.loginForm.controls['email'].hasError('required')) {
    return 'You must enter a value';
  }

  return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
}


submit(){
  if(this.loginForm.valid){
    this.loginUser();
    return true;
  }
  else
  return false;
}

loginUser(): void {
  
  const email = this.loginForm.controls['email'].value;
  const pwd = this.loginForm.controls['pwd'].value;
  this.authService.signWithEmail(email, pwd).then(async r => {
    if (r) {
      this.user = r
      // this.authService.user = new UserModel({
      //   phoneNumber: r.user.phoneNumber,
      //   displayName: r.user.displayName,
      // });
      // this.authService.isAuthenticated = true;
      // this.isLoading = false;

      // Start the admin-backend sidecar
      console.log(r)
      localStorage.setItem('user',JSON.stringify(r.user));
      this.router.navigateByUrl('dashboard').catch(err => {
        console.log(err.error);
      });
    } 
  }).catch(err => {
    console.log(12,err.error);
    alert('invalid credentials')
    //this.serverSideValidation(err.error.errors);
  });
}
  
serverSideValidation(err:any){
      this.errorMessage = err[0].message;
}
connectWithGoogle(){
  this.authService.googleLogin();
}

}
