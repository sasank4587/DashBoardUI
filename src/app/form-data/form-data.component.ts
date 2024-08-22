import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformationObject } from '../model/infromation-object.model';
import {MatTableDataSource} from '@angular/material/table';
import { ProductInvoiceResponse } from '../model/product-invoice-response.model';
import { ProductInvoiceService } from '../services/product-service/product-invoice.service';
import { AuthService } from '@auth0/auth0-angular';

const ELEMENT_DATA: InformationObject[] = [
  {
    id: 1,
    invoiceId: 'invoice001',
    invoiceDate: new Date('2023-10-27'),
    vendorName: 'laxmi',
    brandName: 'laxmi',
    productName: 'Moong Dal',
    productSize: '2LB',
    productQuantity: 10,
    expirationDate: new Date('2023-12-31')
  },
  {
    id: 2,
    invoiceId: 'invoice002',
    invoiceDate: new Date('2023-10-28'),
    vendorName: 'laxmi',
    brandName: 'laxmi',
    productName: 'Moong Dal',
    productSize: '2LB',
    productQuantity: 10,
    expirationDate: new Date('2023-12-31')
  },
  {
    id: 3,
    invoiceId: 'invoice001',
    invoiceDate: new Date('2023-10-28'),
    vendorName: 'laxmi',
    brandName: 'laxmi',
    productName: 'Moong Dal',
    productSize: '4LB',
    productQuantity: 10,
    expirationDate: new Date('2023-12-31')
  },
  {
    id: 4,
    invoiceId: 'invoice002',
    invoiceDate: new Date('2024-06-12'),
    vendorName: 'laxmi',
    brandName: 'laxmi',
    productName: 'Moong Dal',
    productSize: '4LB',
    productQuantity: 10,
    expirationDate: new Date('2023-12-31')
  },
  {
    id: 5,
    invoiceId: 'invoice006',
    invoiceDate: new Date('2024-06-12'),
    vendorName: 'laxmi',
    brandName: 'laxmi',
    productName: 'Moong Dalle',
    productSize: '4LB',
    productQuantity: 10,
    expirationDate: new Date('2023-12-31')
  },
  {
    id: 6,
    invoiceId: 'invoice006',
    invoiceDate: new Date('2024-06-12'),
    vendorName: 'laxmi',
    brandName: 'laxmi',
    productName: 'Moong Dalle',
    productSize: '4LB',
    productQuantity: 20,
    expirationDate: new Date('2024-08-31')
  },
  {
    id: 7,
    invoiceId: 'invoice003',
    invoiceDate: new Date('2024-01-15'),
    vendorName: 'spicy',
    brandName: 'spicy',
    productName: 'Chana Dal',
    productSize: '2LB',
    productQuantity: 15,
    expirationDate: new Date('2024-11-15')
  },
  {
    id: 8,
    invoiceId: 'invoice004',
    invoiceDate: new Date('2024-02-20'),
    vendorName: 'spicy',
    brandName: 'spicy',
    productName: 'Chana Dal',
    productSize: '5LB',
    productQuantity: 8,
    expirationDate: new Date('2024-12-20')
  },
  {
    id: 9,
    invoiceId: 'invoice005',
    invoiceDate: new Date('2024-03-10'),
    vendorName: 'raj',
    brandName: 'raj',
    productName: 'Toor Dal',
    productSize: '3LB',
    productQuantity: 12,
    expirationDate: new Date('2025-01-10')
  },
  {
    id: 10,
    invoiceId: 'invoice007',
    invoiceDate: new Date('2024-04-25'),
    vendorName: 'raj',
    brandName: 'raj',
    productName: 'Toor Dal',
    productSize: '4LB',
    productQuantity: 20,
    expirationDate: new Date('2025-02-25')
  },
  {
    id: 11,
    invoiceId: 'invoice008',
    invoiceDate: new Date('2024-05-15'),
    vendorName: 'krishna',
    brandName: 'krishna',
    productName: 'Masoor Dal',
    productSize: '1LB',
    productQuantity: 30,
    expirationDate: new Date('2025-03-15')
  },
  {
    id: 12,
    invoiceId: 'invoice009',
    invoiceDate: new Date('2024-06-01'),
    vendorName: 'krishna',
    brandName: 'krishna',
    productName: 'Masoor Dal',
    productSize: '2LB',
    productQuantity: 25,
    expirationDate: new Date('2025-04-01')
  },
  {
    id: 13,
    invoiceId: 'invoice010',
    invoiceDate: new Date('2024-06-05'),
    vendorName: 'krishna',
    brandName: 'krishna',
    productName: 'Urad Dal',
    productSize: '3LB',
    productQuantity: 10,
    expirationDate: new Date('2025-05-05')
  },
  {
    id: 14,
    invoiceId: 'invoice011',
    invoiceDate: new Date('2024-06-10'),
    vendorName: 'laxmi',
    brandName: 'laxmi',
    productName: 'Urad Dal',
    productSize: '4LB',
    productQuantity: 18,
    expirationDate: new Date('2025-06-10')
  },
  {
    id: 15,
    invoiceId: 'invoice012',
    invoiceDate: new Date('2024-07-01'),
    vendorName: 'krishna',
    brandName: 'krishna',
    productName: 'Green Gram',
    productSize: '2LB',
    productQuantity: 15,
    expirationDate: new Date('2025-07-01')
  },
  {
    id: 16,
    invoiceId: 'invoice013',
    invoiceDate: new Date('2024-07-15'),
    vendorName: 'krishna',
    brandName: 'krishna',
    productName: 'Green Gram',
    productSize: '3LB',
    productQuantity: 22,
    expirationDate: new Date('2025-08-15')
  },
  {
    id: 17,
    invoiceId: 'invoice014',
    invoiceDate: new Date('2024-08-01'),
    vendorName: 'raj',
    brandName: 'raj',
    productName: 'Black Gram',
    productSize: '2LB',
    productQuantity: 12,
    expirationDate: new Date('2025-09-01')
  },
  {
    id: 18,
    invoiceId: 'invoice015',
    invoiceDate: new Date('2024-08-20'),
    vendorName: 'raj',
    brandName: 'raj',
    productName: 'Black Gram',
    productSize: '3LB',
    productQuantity: 16,
    expirationDate: new Date('2025-10-20')
  },
  {
    id: 19,
    invoiceId: 'invoice016',
    invoiceDate: new Date('2024-09-10'),
    vendorName: 'spicy',
    brandName: 'spicy',
    productName: 'Red Lentils',
    productSize: '1LB',
    productQuantity: 20,
    expirationDate: new Date('2025-11-10')
  },
  {
    id: 20,
    invoiceId: 'invoice017',
    invoiceDate: new Date('2024-09-25'),
    vendorName: 'spicy',
    brandName: 'spicy',
    productName: 'Red Lentils',
    productSize: '2LB',
    productQuantity: 30,
    expirationDate: new Date('2025-12-25')
  },
  {
    id: 21,
    invoiceId: 'invoice018',
    invoiceDate: new Date('2024-10-10'),
    vendorName: 'laxmi',
    brandName: 'laxmi',
    productName: 'Red Kidney Beans',
    productSize: '3LB',
    productQuantity: 18,
    expirationDate: new Date('2025-01-10')
  },
  {
    id: 22,
    invoiceId: 'invoice019',
    invoiceDate: new Date('2024-10-25'),
    vendorName: 'laxmi',
    brandName: 'laxmi',
    productName: 'Red Kidney Beans',
    productSize: '4LB',
    productQuantity: 20,
    expirationDate: new Date('2025-02-25')
  },
  {
    id: 23,
    invoiceId: 'invoice020',
    invoiceDate: new Date('2024-11-05'),
    vendorName: 'raj',
    brandName: 'raj',
    productName: 'Pinto Beans',
    productSize: '2LB',
    productQuantity: 25,
    expirationDate: new Date('2025-03-05')
  },
  {
    id: 24,
    invoiceId: 'invoice021',
    invoiceDate: new Date('2024-11-20'),
    vendorName: 'raj',
    brandName: 'raj',
    productName: 'Pinto Beans',
    productSize: '3LB',
    productQuantity: 30,
    expirationDate: new Date('2025-04-20')
  },
  {
    id: 25,
    invoiceId: 'invoice022',
    invoiceDate: new Date('2024-12-01'),
    vendorName: 'spicy',
    brandName: 'spicy',
    productName: 'White Beans',
    productSize: '2LB',
    productQuantity: 18,
    expirationDate: new Date('2025-05-01')
  },
  {
    id: 26,
    invoiceId: 'invoice023',
    invoiceDate: new Date('2024-12-15'),
    vendorName: 'spicy',
    brandName: 'spicy',
    productName: 'White Beans',
    productSize: '4LB',
    productQuantity: 22,
    expirationDate: new Date('2025-06-15')
  }
];



@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.css'],
})
export class FormDataComponent implements OnInit {

  displayedColumns: string[] = ['position', 'invoiceId', 'invoiceDate', 'vendorName', 'brandName', 'productName', 'productSize', 'productQuantity', 'expirationDate', 'invoiceStatus'];
  dataSource: any;
  invoiceProductsList : Array<ProductInvoiceResponse>;
  filterObj = {
    "InvocieId": "",
    "PageNumber": 1,
    "PageSize": 10
  }
  totalElements : number = 0;
  first : boolean = false;
  last : boolean = false;


  constructor(public productService : ProductInvoiceService,  public router: Router, public auth: AuthService) {
    sessionStorage.removeItem("addInvoiceId");
    console.log('current URl ' + this.router.url);
    this.loadFilterObj();
    this.fetchProducts();
  }

  loadFilterObj() {
    const storedFilterObj = sessionStorage.getItem('filterObj');
    if (storedFilterObj) {
      this.filterObj = JSON.parse(storedFilterObj);
    }
  }

  saveFilterObj() {
    sessionStorage.setItem('filterObj', JSON.stringify(this.filterObj));
  }

  fetchProducts(){
    this.saveFilterObj();
    this.productService.getFilteredProducts(this.filterObj.InvocieId, this.filterObj.PageNumber, this.filterObj.PageSize).subscribe(response =>{
      console.log(response);
      this.invoiceProductsList = response.content;
      this.first = response.first;
      this.last = response.last;
      this.totalElements = response.totalElements;
      console.log("first:")
      console.log(this.first)
      console.log("last:")
      console.log(this.last)
      console.log('Product Response');
      console.log(this.invoiceProductsList);
      this.dataSource = new MatTableDataSource(this.invoiceProductsList);
      console.log(this.dataSource);
    });
  }

  formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  onPrevious() {
    this.filterObj.PageNumber --;
    this.saveFilterObj();
    this.fetchProducts();
  }
  onNext() {
    this.filterObj.PageNumber ++;
    this.saveFilterObj();
    this.fetchProducts();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
