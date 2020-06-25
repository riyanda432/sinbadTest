import { Component, PipeTransform ,OnInit} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Customer} from '../../services/customer.services'
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient, } from '@angular/common/http';
import { Subscription } from 'rxjs';
  import { Http, Response,Headers,RequestOptions } from '@angular/http';
  import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms'
  import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  addForm: FormGroup;
  closeResult = '';

  rows: FormArray;
  itemForm: FormGroup;
  TableData:any =[]
  EditRowId:any = ''
  updateStatus:boolean =false
 
  CustomerData:any =[]
  CustomerData2:any =[]
  CustomerUpdate:any =[]
  CustomerDelete:any =[]
  CustomerDelete2:any =[]
  CustomerAdd:any =[]
  CustomerAdd2:any =[]
  newCustomer: any = {};  
  name:string =''
  email:string =''

  private fieldArray: Array<any> = [];

  private newAttribute: any = {};
  CustomerUpdate2: Object;


  
  constructor( private HttpClient:HttpClient, private CustomerDataTemp:Customer,private fb: FormBuilder,private modalService: NgbModal) {
   
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });

    this.rows = this.fb.array([]);
   }
   
   Edit(val){
    this.EditRowId = val 
   }
   addItem(name,email){
    this.CustomerAdd = this.CustomerDataTemp.add(name,email).subscribe(data=>{
      this.CustomerAdd2 = data
      if(this.updateStatus == true){
        this.CustomerData = this.CustomerDataTemp.fetchData().subscribe(data=>{
          this.CustomerData2 = data; 
        }); 
      }
    })
   }
   async save(name,email){
   
    this.CustomerAdd =  await this.CustomerDataTemp.add(name,email).subscribe(data=>{
      this.CustomerAdd2 = data
      this.updateStatus = true
      console.log(this.updateStatus)
      if(this.updateStatus == true){
        this.CustomerData = this.CustomerDataTemp.fetchData().subscribe(data=>{
          this.CustomerData2 = data; 
        this.CustomerAdd2.push(data)

        }); 
      }
    })
   }
   open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
   deleteItem(id){
      this.CustomerDelete = this.CustomerDataTemp.delete(id).subscribe(data=>{
        this.CustomerDelete2 = data
        console.log("DELETE");
        if(this.updateStatus == true){
          this.CustomerData = this.CustomerDataTemp.fetchData().subscribe(data=>{
            this.CustomerData2 = data; 
          }); 
        }
      })
   }

   updateItem(id,name,email){
    console.log(id,name)
    this.CustomerUpdate= this.CustomerDataTemp.update(id,name,email).subscribe(data=>{
      console.log(data)
      this.CustomerUpdate2 = data
      this.updateStatus =true
      if(this.updateStatus == true){
        this.CustomerData = this.CustomerDataTemp.fetchData().subscribe(data=>{
          this.CustomerData2 = data; 
        }); 
      }
         
    })
   }

  ngOnInit(){
   console.log("PERTAMA")
    this.CustomerData = this.CustomerDataTemp.fetchData().subscribe(data=>{
      this.CustomerData2 = data; 
      console.log(this.CustomerData2)
    });
  }

}
