import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddInvoiceRequest } from '../model/add-invoice-request.model';
import { ProductInvoiceService } from '../services/product-service/product-invoice.service';
import { ProductListResponse } from '../model/product-list-response.model';
import {MatTableDataSource} from '@angular/material/table';
import { ProductInvoiceResponse } from '../model/product-invoice-response.model';
@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  displayedColumns: string[] = ['invoiceId', 'invoiceDate', 'vendorName', 'brandName', 'productName', 'productSize', 'productQuantity', 'expirationDate'];
  dataSource: any;

  myFormGroup : FormGroup;
  invoiceID : string = '';
  showProducts : boolean = false;
  productsResponse : ProductListResponse;
  invoiceProductsList : Array<ProductInvoiceResponse>;

  constructor(formbuilder : FormBuilder, public productService : ProductInvoiceService) { 
    this.myFormGroup=formbuilder.group({
      "invoiceId" : new FormControl("", [Validators.required]),
      "invoiceDate" : new FormControl("",[Validators.required]),
      "vendorName" : new FormControl("",[Validators.required]),
      "brandName" : new FormControl("",[Validators.required]),
      "productName" : new FormControl("", [Validators.required]),
      "size" : new FormControl("",[Validators.required]),
      "quantity" : new FormControl("",[Validators.required]),
      "expiryDate" : new FormControl("",[Validators.required])
    })

    if(this.showProducts && this.invoiceID != null && this.invoiceID.length != 0){
      productService.getProductDetailsFromInvoiceId(this.invoiceID).subscribe(response =>{
        this.invoiceProductsList = response;
        console.log('Product Response');
        console.log(this.invoiceProductsList);
        this.dataSource = new MatTableDataSource(this.invoiceProductsList);
        console.log(this.dataSource);
      });
    }

    
  }

  ngOnInit(): void {
  }

  save(status: string){

    if(this.myFormGroup.controls['invoiceId'].value.length!=0&&
      this.myFormGroup.controls['invoiceDate'].value.length!=0&&
      this.myFormGroup.controls['vendorName'].value.length!=0&&
      this.myFormGroup.controls['brandName'].value.length!=0&&
      this.myFormGroup.controls['productName'].value.length!=0&&
      this.myFormGroup.controls['size'].value.length!=0&&
      this.myFormGroup.controls['quantity'].value.length!=0 && 
      this.myFormGroup.controls['expiryDate'].value.length!=0){


        let user = new AddInvoiceRequest(
          this.myFormGroup.controls['invoiceId'].value,
          this.myFormGroup.controls['invoiceDate'].value,
          this.myFormGroup.controls['vendorName'].value,
          this.myFormGroup.controls['brandName'].value,
          this.myFormGroup.controls['productName'].value,
          this.myFormGroup.controls['size'].value,
          this.myFormGroup.controls['quantity'].value,
          this.myFormGroup.controls['expiryDate'].value,
          status,
        )

        this.productService.add(user).subscribe((response)=>{
          console.log(response);
          if(status == 'OPEN'){
            this.invoiceProductsList = response;
            this.dataSource = new MatTableDataSource(this.invoiceProductsList);
            this.invoiceID = this.myFormGroup.controls['invoiceId'].value
            this.showProducts = true;
          }else if (status == 'CLOSE'){
            this.invoiceID == null;
            this.showProducts = false;
            this.myFormGroup.controls['invoiceId'].reset();
          }
          this.myFormGroup.controls['invoiceDate'].reset();
          this.myFormGroup.controls['vendorName'].reset();
          this.myFormGroup.controls['brandName'].reset();
          this.myFormGroup.controls['productName'].reset();
          this.myFormGroup.controls['size'].reset();
          this.myFormGroup.controls['quantity'].reset();
          this.myFormGroup.controls['expiryDate'].reset();
          setTimeout(function() {
            console.log('hide');
            this.showElement = false;
          }.bind(this), 3000);
        },
        // failure function
        failureData => {
          console.log(failureData);
          setTimeout(function() {
            console.log('hide');
          }.bind(this), 3000);
        });
      }
  }

  makeDefault(value){
    
  }

}
