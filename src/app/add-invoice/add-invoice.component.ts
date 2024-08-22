import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddInvoiceRequest } from '../model/add-invoice-request.model';
import { ProductInvoiceService } from '../services/product-service/product-invoice.service';
import { ProductListResponse } from '../model/product-list-response.model';
import {MatTableDataSource} from '@angular/material/table';
import { ProductInvoiceResponse } from '../model/product-invoice-response.model';
import { Router} from '@angular/router';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['invoiceId', 'invoiceDate', 'vendorName', 'brandName', 'productName', 'productSize', 'productQuantity', 'expirationDate'];
  dataSource: any;

  myFormGroup : FormGroup;
  invoiceID : string = '';
  showProducts : boolean = false;
  productsResponse : ProductListResponse;
  invoiceProductsList : Array<ProductInvoiceResponse>;
  previousUrl : string;

  constructor(formbuilder: FormBuilder, public productService: ProductInvoiceService, private router: Router) {
    sessionStorage.removeItem("filterObj");
    console.log('current URl ' + this.router.url);
    this.myFormGroup = formbuilder.group({
      "invoiceId": new FormControl("", [Validators.required]),
      "invoiceDate": new FormControl("", [Validators.required]),
      "vendorName": new FormControl("", [Validators.required]),
      "brandName": new FormControl("", [Validators.required]),
      "productName": new FormControl("", [Validators.required]),
      "size": new FormControl("", [Validators.required]),
      "quantity": new FormControl("", [Validators.required]),
      "expiryDate": new FormControl("", [Validators.required])
    });
  }
  
  ngOnInit(): void {

    const openInvoice = localStorage.getItem("invoiceId");
  
    if (openInvoice != null) {
      this.showProducts = true;
      this.invoiceID = openInvoice;
      localStorage.removeItem("invoiceId");
      sessionStorage.setItem("addInvoiceId", this.invoiceID);
    } else if(sessionStorage.getItem("addInvoiceId") != null){
      this.showProducts = true;
      this.invoiceID = sessionStorage.getItem("addInvoiceId");
    }
  
    if (this.showProducts && this.invoiceID != null && this.invoiceID.length != 0) {
      this.productService.getProductDetailsFromInvoiceId(this.invoiceID).subscribe(response => {
        this.invoiceProductsList = response;
        this.dataSource = new MatTableDataSource(this.invoiceProductsList);
      });
    }
  }
  
  ngOnDestroy(): void {
    console.log("destroying compoent")
  }
  
  
  
  save() {
    if (this.myFormGroup.valid) {
      let user = new AddInvoiceRequest(
        this.myFormGroup.controls['invoiceId'].value,
        this.myFormGroup.controls['invoiceDate'].value,
        this.myFormGroup.controls['vendorName'].value,
        this.myFormGroup.controls['brandName'].value,
        this.myFormGroup.controls['productName'].value,
        this.myFormGroup.controls['size'].value,
        this.myFormGroup.controls['quantity'].value,
        this.myFormGroup.controls['expiryDate'].value
      );
  
      this.productService.add(user).subscribe((response) => {
        console.log(response);
        this.invoiceProductsList = response;
        this.dataSource = new MatTableDataSource(this.invoiceProductsList);
        this.invoiceID = this.myFormGroup.controls['invoiceId'].value;
        sessionStorage.setItem("addInvoiceId", this.invoiceID);
        this.showProducts = true;
        this.myFormGroup.reset();
      },
        failureData => {
          console.log(failureData);
        });
    }
  }
  
  finish() {
    if (this.invoiceID != null) {
      this.productService.finish(this.invoiceID).subscribe((response) => {
        console.log(response);
        this.invoiceProductsList = response;
        this.invoiceID = null;
        this.showProducts = false;
        sessionStorage.removeItem("addInvoiceId");
      },
        failureData => {
          console.log(failureData);
        });
    }
  }
  
  makeDefault(value) {
    // Implement your makeDefault logic here
  }
  

}