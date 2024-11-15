import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogin: boolean;

  constructor(private authService: MsalService, public router: Router) { }

  ngOnInit(): void {
    this.checkLoginStatus();

    // Subscribe to login state changes if MsalService provides such a feature
    this.authService.instance.addEventCallback((event) => {
      if (event.eventType === 'msal:loginSuccess' || event.eventType === 'msal:logoutSuccess') {
        this.checkLoginStatus();
      }
    });
  }

  checkLoginStatus(): void {
    this.isLogin = this.authService.instance.getAllAccounts().length > 0;
    console.log("login", this.isLogin);
  }

  navigateToPage1() {
    this.router.navigate(['/meat']);
  }
  navigateToPage2() {
    this.router.navigate(['/grocery']);
  }
  navigateToPage3() {
    this.router.navigate(['/veg']);
  }

}
