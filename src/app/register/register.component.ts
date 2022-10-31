import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage:string ='';

  constructor(private authService: AuthService, private fb: FormBuilder,private router:Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],

    });
   }

  ngOnInit(): void {
    //this.authService.getUserStatus();
    
  }

  getErrorMessage() {
    if (this.registerForm?.controls['email'].hasError('required')) {
      return 'You must enter email';
    }
    if (this.registerForm?.controls['pwd'].hasError('required')) {
      return 'You must enter password';
    }


    return this.registerForm?.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  submit(){
    if(this.registerForm?.valid){
      this.registerUser();
      return true;
    }
    else
    return false;
  }

  registerUser(): void {
  
    const email = this.registerForm?.controls['email'].value;
    const pwd = this.registerForm?.controls['pwd'].value;
    this.authService.signUp(email, pwd).then(r => {
      if (r) {
        //this.user = r
        
  
        // Start the admin-backend sidecar
         console.log(r)
        // localStorage.setItem('user',JSON.stringify(r.user));
        this.router.navigateByUrl('dashboard').catch(err => {
          console.log(err.error);
        });
      } 
    }).catch(error => {
      this.errorMessage = error.message;
      //this.serverSideValidation(err.error.errors);
    });
  }


}
