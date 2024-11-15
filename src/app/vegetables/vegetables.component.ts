import { Component, OnInit } from '@angular/core';
import { ProductInventoryService } from '../services/inventory/product-inventory.service';
import { InventoryCurrentCount } from '../model/inventory-current-count.model';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryRequest } from '../model/inventory-request.model';
import { UpdateInventoryRequest } from '../model/update-inventory-request.model';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-vegetables',
  templateUrl: './vegetables.component.html',
  styleUrls: ['./vegetables.component.css']
})
export class VegetablesComponent implements OnInit {

  inventoryCountList: Array<InventoryCurrentCount> = [];
  tempInventoryCountList: Array<InventoryCurrentCount> = [];
  currentDataSource: MatTableDataSource<InventoryCurrentCount>;
  newCategory = { name: '', count: 0 };
  selectedOption: string = 'view'; // Default to 'view'

  // Columns to display in the Material tables
  displayedColumns: string[] = ['entry', 'count'];
  updateColumns: string[] = ['entry', 'count', 'actions'];

  constructor(public productInventory: ProductInventoryService) { }

  ngOnInit(): void {
    this.getInventoryCount();
  }

  setOption(option: string) {
    this.selectedOption = option;
    if (option === 'update') {
      // Create a deep copy of the inventoryCountList for temporary updates
      this.tempInventoryCountList = cloneDeep(this.inventoryCountList);
    }
  }

  changeCount(item: InventoryCurrentCount, amount: number) {
    item.count += amount;
    if (item.count < 0) item.count = 0; // Prevent negative inventory
  }

  submitUpdates() {
    const updateRequests: InventoryRequest[] = this.tempInventoryCountList.map(item => {
      return new InventoryRequest('VEGETABLE', item.entry, item.count);
    });

    const updateRequestPayload = new UpdateInventoryRequest();
    updateRequestPayload.requestList = updateRequests;

    this.productInventory.update(updateRequestPayload).subscribe(response => {
      console.log('Update successful:', response);
      // Apply the changes to the actual inventory list
      this.inventoryCountList = cloneDeep(this.tempInventoryCountList);
      this.redirectToView();
    }, error => {
      console.error('Update failed:', error);
    });
  }

  saveCategory() {
    if (this.newCategory.name && this.newCategory.count >= 0) {
      const request = new InventoryRequest('VEGETABLE', this.newCategory.name, this.newCategory.count);
      this.productInventory.add(request).subscribe(response => {
        console.log('Category added:', response);
        this.newCategory = { name: '', count: 0 }; // Reset the form
        this.getInventoryCount(); // Refresh the inventory list
        this.redirectToView();
      }, error => {
        console.error('Add category failed:', error);
      });
    } else {
      console.error('Invalid category data');
    }
  }

  redirectToView() {
    this.getInventoryCount();
    this.setOption('view');
  }

  getInventoryCount() {
    this.productInventory.getInventoryCount('VEGETABLE').subscribe(response => {
      this.inventoryCountList = response;
      this.currentDataSource = new MatTableDataSource(this.inventoryCountList);
      console.log(this.inventoryCountList);
    });
  }

}
