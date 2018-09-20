import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MesuresService } from './mesures.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-mesures',
  templateUrl: './mesures.component.html',
  styleUrls: ['./mesures.component.css'],
  providers: [MesuresService]

})
export class MesuresComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  measureId = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  temperature = new FormControl('', Validators.required);
  humidity = new FormControl('', Validators.required);
  packages = new FormControl('', Validators.required);

  constructor(public serviceMesures: MesuresService, fb: FormBuilder) {
    this.myForm = fb.group({
      measureId: this.measureId,
      type: this.type,
      temperature: this.temperature,
      humidity: this.humidity,
      packages: this.packages,
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceMesures.getAll()
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
