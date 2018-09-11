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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.mynetwork.Package',
      'packageId': this.packageId.value,
      'description': this.description.value,
      'creationDate': this.creationDate.value,
      'deliveryDate': this.deliveryDate.value,
      'customer': this.customer.value
    };

    this.myForm.setValue({
      'packageId': null,
      'description': null,
      'creationDate': null,
      'deliveryDate': null,
      'customer': null
    });

    return this.servicePackage.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'packageId': null,
        'description': null,
        'creationDate': null,
        'deliveryDate': null,
        'customer': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.mynetwork.Package',
      'description': this.description.value,
      'creationDate': this.creationDate.value,
      'deliveryDate': this.deliveryDate.value,
      'customer': this.customer.value
    };

    return this.servicePackage.updateAsset(form.get('packageId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
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


  deleteAsset(): Promise<any> {

    return this.servicePackage.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
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

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.servicePackage.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'packageId': null,
        'description': null,
        'creationDate': null,
        'deliveryDate': null,
        'customer': null
      };

      if (result.packageId) {
        formObject.packageId = result.packageId;
      } else {
        formObject.packageId = null;
      }

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

      if (result.creationDate) {
        formObject.creationDate = result.creationDate;
      } else {
        formObject.creationDate = null;
      }

      if (result.deliveryDate) {
        formObject.deliveryDate = result.deliveryDate;
      } else {
        formObject.deliveryDate = null;
      }

      if (result.customer) {
        formObject.customer = result.customer;
      } else {
        formObject.customer = null;
      }

      this.myForm.setValue(formObject);

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

  resetForm(): void {
    this.myForm.setValue({
      'packageId': null,
      'description': null,
      'creationDate': null,
      'deliveryDate': null,
      'customer': null
      });
  }
}
