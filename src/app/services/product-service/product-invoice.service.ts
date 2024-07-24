import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { AddInvoiceRequest } from 'src/app/model/add-invoice-request.model';
import { ProductListResponse } from 'src/app/model/product-list-response.model';

const ADD_URL = "http://localhost:8090/products/add";
const API_URL = "http://localhost:8090/products";
const PRODUCTS_URL = "http://localhost:8090/products/all";
const FILTER_URL = "http://localhost:8090/products/filter";

@Injectable({
  providedIn: 'root'
})
export class ProductInvoiceService {
  test: Array<{firstName:string, lastName:string}> = [];
  constructor(public http : HttpClient) { }


  add(details : AddInvoiceRequest):any{
    return this.http.post(ADD_URL,details).pipe(
      map((successData : Response)=>{
        console.log(successData); 
        return successData;
      }),
      map(failureData=>{
        console.log(failureData);
        return failureData;
      })
    );
  }

  getProductDetailsFromInvoiceId(invoiceId : string) : any{
    console.log(invoiceId);
    return this.http.get<any>(API_URL+"/"+invoiceId)
  }

  getAllProducts() : any{
    return this.http.get<any>(PRODUCTS_URL)
  }

  getFilteredProducts(invoiceId : string, pageNumber : number, pageSize : number) : any{
    let data = {"invoiceId": invoiceId, "pageNo": pageNumber-1, "pageSize": pageSize};
    return this.http.get<any>(FILTER_URL,{params: data})
  }

  



}
