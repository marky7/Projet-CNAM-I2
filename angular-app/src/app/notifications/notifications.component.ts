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
}