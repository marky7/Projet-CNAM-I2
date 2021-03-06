import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TableListService } from './TableList.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  providers: [TableListService]

})
export class TableListComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  packageId = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  creationDate = new FormControl('', Validators.required);
  deliveryDate = new FormControl('', Validators.required);
  customer = new FormControl('', Validators.required);

  constructor(public servicePackage: TableListService, fb: FormBuilder) {
    this.myForm = fb.group({
      packageId: this.packageId,
      description: this.description,
      creationDate: this.creationDate,
      deliveryDate: this.deliveryDate,
      customer: this.customer,
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicePackage.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }
}