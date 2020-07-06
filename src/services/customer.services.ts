import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient,HttpHeaders, HttpParams  } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { Http, Response,Headers,RequestOptions } from '@angular/http';

@Injectable({providedIn: 'root'})
export class Customer {
    dataCustomer = [];
    numberChanged = 0;
    customerUpdate:any =[]
    httpOptions = {
        headers: new HttpHeaders( {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        })
       
      };
      
    
    constructor(private httpClient: HttpClient) {

    }
 
    update(id,name,email) {

        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        
        return this.httpClient.put("http://localhost:3000/api/v1/customer-update",
            {
                "id": id,
                "name":name,
                "email":email
            },
            {headers})
    }
    fetchData() {
       return this.httpClient.get<any>('http://localhost:3000/api/v1/customer-list').pipe(map(cust => {
            console.log(cust.data);
            return cust.data;
        }))
    }
    delete(id){
       
        return this.httpClient.delete(`http://localhost:3000/api/v1/customer-delete/${id}`,this.httpOptions)
    }

    add(name,email){ 
        const headers = new HttpHeaders()
        .set("Content-Type", "application/json");
    
        return this.httpClient.post("http://localhost:3000/api/v1/customer-create",
            {
                "name":name,
                "email":email
            },
            {headers})
    }
}
