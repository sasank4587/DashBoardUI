import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  navigateToPage1() {
    this.router.navigate(['/dashboard']);
  }
  navigateToPage2() {
    this.router.navigate(['/add-invoice']);
  }
  navigateToPage3() {
    this.router.navigate(['/form-data']);
  }

}
