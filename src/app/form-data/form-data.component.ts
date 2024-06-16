import { Component, OnInit, ViewChild } from '@angular/core';
import { InformationObject } from '../model/infromation-object.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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
  }
];


@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.css'],
})
export class FormDataComponent implements OnInit {

  displayedColumns: string[] = ['invoiceId', 'invoiceDate', 'vendorName', 'brandName', 'productName', 'productSize', 'productQuantity', 'expirationDate'];
  dataSource: MatTableDataSource<InformationObject>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { 
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
