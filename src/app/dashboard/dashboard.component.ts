import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';
import { ProductInvoiceService } from '../services/product-service/product-invoice.service';
import { InvoiceResponse } from '../model/invoice-response.model';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['position', 'invoiceId', 'action'];
  dataSource: any;

  openInvoiceList : Array<InvoiceResponse>;

  // public chart: any;

  // createChart() {
  //   this.chart = new Chart("MyChart", {
  //     type: 'bar',
  //     data: {
  //       labels: ['2017', '2018', '2019', '2020', '2021'],
  //       datasets: [
  //         {
  //           // label: "Plates, Sheets, ...",
  //           data: ["16847", "18586", "40067", "49520", "69296"],
  //           // backgroundColor: "rgba(255, 99, 132, 0.7)",
  //         },
  //         {
  //           // label: "Paper, Paperboard, ...",
  //           data: ["82097", "69387", "35335", "30952", "39685"],
  //           // backgroundColor: "rgba(54, 162, 235, 0.7)",
  //         },
  //         {
  //           // label: "Bottles, Flasks, ...",
  //           data: ["2173", "4771", "7901", "4239", "10806"],
  //           // backgroundColor: "rgba(255, 205, 86, 0.7)",
  //         },
  //         {
  //           // label: "Sacks, Bags, ...",
  //           data: ["47491", "38800", "57954", "43763", "48403"],
  //           // backgroundColor: "rgba(75, 192, 192, 0.7)",
  //         }
  //       ]
  //     },
  //     options: {
  //       aspectRatio: 2.5,
  //       plugins: {
  //         title: {
  //           display: true,
  //           text: "Sales by Category (2017-2021)",
  //           font: {
  //             size: 18,
  //             weight: 'bold',
  //           }
  //         },
  //         legend: {
  //           display: true,
  //           labels: {
  //             font: {
  //               size: 14,
  //             }
  //           }
  //         },
  //       },
  //       scales: {
  //         x: {
  //           grid: {
  //             display: false // Hide X-axis grid lines for cleaner look
  //           },
  //           ticks: {
  //             font: {
  //               size: 14
  //             }
  //           }
  //         },
  //         y: {
  //           grid: {
  //             color: 'rgba(0, 0, 0, 0.1)', // Add a light grey color to Y-axis grid lines
  //           },
  //           ticks: {
  //             font: {
  //               size: 14
  //             },
  //           }
  //         }
  //       }
  //     }
  //   });
  // }

  chartOptions = {
	  title: {
		  text: "Number of products about to expire",
      fontSize: 20,
      fontFamily: "Arial"
	  },
	  axisY: {
      title: "Quantity",
      titleFontSize: 18,
      labelFontSize: 14,
      labelFontColor: "#6D6968"
    },
    axisX: {
      title: "Fruit",
      titleFontSize: 18,
      labelFontSize: 14,
      labelFontColor: "#6D6968"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Apple",  y: 10, color: "#FF0000" }, // Red
        { label: "Orange", y: 60, color: "#FFA500" }, // Orange
        { label: "Banana", y: 25, color: "#FFFF00" }, // Yellow
        { label: "Mango",  y: 30, color: "#FF4500" }, // Orange-Red
        { label: "Grape",  y: 28, color: "#8A2BE2" }  // Blue-Violet
      ]
	  }]                
    };

  constructor(public productService : ProductInvoiceService, public router: Router) {
    sessionStorage.removeItem("addInvoiceId");
    sessionStorage.removeItem("filterObj");
    console.log('current URl ' + this.router.url);
    this.getOpenInvoices();
   }

  getOpenInvoices(){
    this.productService.getOpenInvoices().subscribe(response =>{
      this.openInvoiceList = response;
      console.log(this.openInvoiceList);
      this.dataSource = new MatTableDataSource(this.openInvoiceList);
      console.log(this.dataSource);
    });
  }

  open(invoiceId : string){
    localStorage.setItem("invoiceId", invoiceId);
    this.router.navigate(['/add-invoice']);
  }



  ngOnInit(): void {
    // this.createChart();
  }

}
