import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  loginForm: FormGroup;
  errorMessage: string = '';
  constructor(private authService: AuthService, private fb: FormBuilder
    , private router: Router) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  ngOnInit(): void {
   
    this.authService.getUserStatus();
  }

  getErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter email';
    }
    if (this.loginForm.controls['pwd'].hasError('required')) {
      return 'You must enter password';
    }

    return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }


  submit() {
    if (this.loginForm.valid) {
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
        
        this.router.navigateByUrl('dashboard')
      }
    }).catch(error => {

      this.errorMessage = error.message;

    });
  }

  serverSideValidation(err: any) {
    this.errorMessage = err[0].message;
  }

  connectWithGoogle() {
    this.authService.googleLogin();
  }

}
