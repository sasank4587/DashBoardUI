import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { InventoryRequest } from 'src/app/model/inventory-request.model';
import { UpdateInventoryRequest } from 'src/app/model/update-inventory-request.model';


const ADD_URL = "http://localhost:8090/inventory/add";
const UPDATE_URL = "http://localhost:8090/inventory/update";
const API_URL = "http://localhost:8090/inventory/count";

@Injectable({
  providedIn: 'root'
})
export class ProductInventoryService {
    
    constructor(public http : HttpClient) { }


    add(details : InventoryRequest) : any {
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

    update(details : UpdateInventoryRequest) : any {
        return this.http.post(UPDATE_URL,details).pipe(
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

    getInventoryCount(category : string) : any{
        console.log(category);
        return this.http.get<any>(API_URL+"/"+category)
      }

  
}
