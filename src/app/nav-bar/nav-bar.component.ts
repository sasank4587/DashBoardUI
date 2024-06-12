import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
   name : string;
   firstName : string;
   lastName : string;
  constructor() {}
  
  logout(){
    console.log("logout called!")
    sessionStorage.clear();
  }
  ngOnInit(): void {
   //localStorage.setItem('abc', 'sasank');
  //  this.name = localStorage.getItem('abc');
  this.firstName = sessionStorage.getItem('firstName');
  this.lastName = sessionStorage.getItem('lastName');
   this.name = this.firstName+ " " + this.lastName;

  }

}
