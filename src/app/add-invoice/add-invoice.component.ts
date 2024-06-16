import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  myFormGroup : FormGroup;

  constructor(formbuilder : FormBuilder) { 
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
  }

  ngOnInit(): void {
  }

  add(){
    
  }

  makeDefault(value){
    
  }

}
