import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AddInvoiceRequest } from 'src/app/model/add-invoice-request.model';
import { Observable } from 'rxjs';

const ADD_URL = "http://localhost:8090/products/add";
const CLOSE_URL = "http://localhost:8090/products/status";
const API_URL = "http://localhost:8090/products";
const PRODUCTS_URL = "http://localhost:8090/products/all";
const FILTER_URL = "http://localhost:8090/products/filter";
const OPEN_INVOICE_URL = "http://localhost:8090/products/open/invoices";

@Injectable({
  providedIn: 'root'
})
export class ProductInvoiceService {
  constructor(private http: HttpClient) {}

  add(details: AddInvoiceRequest): any {
    return this.http.post(ADD_URL, details).pipe(
      map((successData: Response) => {
        console.log(successData); 
        return successData;
      }),
      map(failureData => {
        console.log(failureData);
        return failureData;
      })
    );
  }

  getProductDetailsFromInvoiceId(invoiceId: string): any {
    return this.http.get<any>(`${API_URL}/${invoiceId}`);
  }

  getAllProducts(): any {
    return this.http.get<any>(PRODUCTS_URL);
  }

  getFilteredProducts(invoiceId: string, pageNumber: number, pageSize: number): any {
    const params = { "invoiceId": invoiceId, "pageNo": (pageNumber - 1).toString(), "pageSize": pageSize.toString() };
    return this.http.get<any>(FILTER_URL, { params });
  }

  finish(invoiceId: string): any {
    return this.http.put(`${CLOSE_URL}/${invoiceId}`, null).pipe(
      map((successData: Response) => {
        console.log(successData); 
        return successData;
      }),
      map(failureData => {
        console.log(failureData);
        return failureData;
      })
    );
  }

  getOpenInvoices(): Observable<any> {
    return this.http.get(OPEN_INVOICE_URL);
  }
}
