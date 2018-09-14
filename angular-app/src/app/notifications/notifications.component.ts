import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NotificationsService } from './Notifications.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [NotificationsService]

})
export class NotificationsComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  alertId = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  creationDate = new FormControl('', Validators.required);
  users = new FormControl('', Validators.required);
  package = new FormControl('', Validators.required);

  constructor(public servicePackage: NotificationsService, fb: FormBuilder) {
    this.myForm = fb.group({
      alertId: this.alertId,
      description: this.description,
      type: this.type,
      status: this.status,
      creationDate: this.creationDate,
      users: this.users,
      package: this.package,
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
      $class: 'org.example.mynetwork.Alert',
      'alertId': this.alertId.value,
      'description': this.description.value,
      'type': this.type.value,
      'status': this.status.value,
      'creationDate': this.creationDate.value,
      'users': this.users.value,
      'package': this.package.value
    };

    this.myForm.setValue({
      'alertId': null,
      'description': null,
      'type': null,
      'status': null,
      'creationDate': null,
      'users': null,
      'package': null
    });

    return this.servicePackage.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'alertId': null,
        'description': null,
        'type': null,
        'status': null,
        'creationDate': null,
        'users': null,
        'package': null
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
      $class: 'org.example.mynetwork.Alert',
      'description': this.description.value,
      'type': this.type.value,
      'status': this.status.value,
      'creationDate': this.creationDate.value,
      'users': this.users.value,
      'package': this.package.value
    };

    return this.servicePackage.updateAsset(form.get('alertId').value, this.asset)
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
        'alertId': null,
        'description': null,
        'type': null,
        'status': null,
        'creationDate': null,
        'users': null,
        'package': null
      };

      if (result.alertId) {
        formObject.alertId = result.alertId;
      } else {
        formObject.alertId = null;
      }

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

      if (result.type) {
        formObject.type = result.type;
      } else {
        formObject.type = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.creationDate) {
        formObject.creationDate = result.creationDate;
      } else {
        formObject.creationDate = null;
      }

      if (result.users) {
        formObject.users = result.users;
      } else {
        formObject.users = null;
      }

      if (result.package) {
        formObject.package = result.package;
      } else {
        formObject.package = null;
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
      'alertId': null,
      'description': null,
      'type': null,
      'status': null,
      'creationDate': null,
      'users': null,
      'package': null
      });
  }
}
