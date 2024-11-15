import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  myFormGroup: FormGroup;
  emailValid: boolean = false;
  nullValueErrorMessage: boolean = false;
  invalid: boolean = false;

  constructor(formBuilder: FormBuilder, public router: Router, public authService: AuthService){
    sessionStorage.removeItem("addInvoiceId");
    sessionStorage.removeItem("filterObj");
    console.log('current URl ' + this.router.url);

    // if(sessionStorage.getItem('currentUrl') != null){
    //   sessionStorage.setItem('currentUrl', this.router.url);
    // } else{
    //   sessionStorage.setItem('previousUrl', sessionStorage.getItem('currentUrl'))
    // }

    // sessionStorage.setItem('currentUrl', this.router.url);

    this.myFormGroup = formBuilder.group({
      "email": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", [Validators.required])
    })
  }

  emailValidation(email: HTMLInputElement) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value)) {
      this.emailValid = false;
      console.log(this.emailValid)
    }
    else {

      this.emailValid = true;
      console.log(this.emailValid)
    }
    if (email.value.length == 0) {
      this.emailValid = false
    } else {
      this.nullValueErrorMessage = false;
    }
  }

  passwordEmpty() {
    if (this.myFormGroup.controls['password'].value.length != 0) {
      this.nullValueErrorMessage = false;
    }
    else {
      this.nullValueErrorMessage = true;
    }
  }

  login() {
    console.log()
    this.authService.loginWithRedirect();
    // if (this.myFormGroup.controls['email'].value.length != 0 && this.myFormGroup.controls['password'].value.length != 0) {
    //   // let userCredentials = new AuthenticationRequest(this.myFormGroup.controls['email'].value, this.myFormGroup.controls['password'].value)
    //   this.loginService.login(userCredentials).subscribe((successData) => {
    //     sessionStorage.setItem("user", userCredentials.username);
    //     sessionStorage.setItem("firstName", successData.firstName);
    //     sessionStorage.setItem("lastName", successData.lastName);
    //     sessionStorage.setItem("id",successData.id)
    //     this.router.navigate(['/home']);
    //     console.log(successData)
    //   }, failureData => {
    //     console.log("fail");
    //     this.invalid = true;
    //     console.log(failureData);
    //   })
    //   this.nullValueErrorMessage = false;
    // }
    // else {
    //   this.nullValueErrorMessage = true;
    // }
    // this.router.navigate(['/form-data']);
  }


  ngOnInit(): void {

  }

}
