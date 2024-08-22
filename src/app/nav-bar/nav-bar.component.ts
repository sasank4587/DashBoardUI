import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
   name : any;
   firstName : string;
   lastName : string;
  constructor(public auth : AuthService, @Inject(DOCUMENT) private doc: Document,) {}
  
  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
  ngOnInit(): void {
   //localStorage.setItem('abc', 'sasank');
  //  this.name = localStorage.getItem('abc');
  this.firstName = sessionStorage.getItem('firstName');
  this.lastName = sessionStorage.getItem('lastName');
  console.log(this.auth)
  this.auth.user$.subscribe(result=> {
    console.log("test", result.name)
    this.name = result.name
});

  }

}
