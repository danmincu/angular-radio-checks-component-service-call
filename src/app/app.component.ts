import { Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import { CheckBoxComponent } from './check-box/check-box.component';
import { map, switchMap, debounceTime } from 'rxjs/operators';
import { Observable, of, Subscription, Subject, interval } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy, OnChanges {
  name = 'Angular Radio buttons - detail checkboxes';

  public refinementSelection: string;
  currentAttributes = [];

  dataFromConfigService = [
      { displayNames: [{culture: 'en', value: 'Person'}], description: null,
        attributes:  [
          { displayNames: [{culture: 'en', value: 'Person Name'}], field: 'involvements.personname'},
          { displayNames: [{culture: 'en', value: 'GovernmentId'}], field: 'involvements.governementId'},
          { displayNames: [{culture: 'en', value: 'Passport'}], field: 'involvements.passport'},
          { displayNames: [{culture: 'en', value: 'Driver Licence'}], field: 'involvements.driverlicense'},
          { displayNames: [{culture: 'en', value: 'Email'}], field: 'involvements.email'}
        ]
      },
      { displayNames: [{culture: 'en', value: 'Device'}], description: null,
        attributes:  [
          { displayNames: [{culture: 'en', value: 'Account name'}], field: 'involvements.accout'},
          { displayNames: [{culture: 'en', value: 'MSISDN'}], field: 'involvements.msisdn' , checked: true},
          { displayNames: [{culture: 'en', value: 'IMSI'}], field: 'involvements.imsi'},
          { displayNames: [{culture: 'en', value: 'IMEI'}], field: 'involvements.imei'},
        ]
      },
      { displayNames: [{culture: 'en', value: 'Organization'}], description: null,
        attributes: [
          { displayNames: [{culture: 'en', value: 'Organization'}], field: 'involvements.organization'},
          { displayNames: [{culture: 'en', value: 'Organization Domain'}], field: 'involvements.organizationdomain'},
          { displayNames: [{culture: 'en', value: 'Place Name'}], field: 'involvements.placename'}
        ]
      },
      { displayNames: [{culture: 'en', value: 'Place'}], description: null,
        attributes: [
          { displayNames: [{culture: 'en', value: 'Organization Domain'}], field: 'involvements.organizationdomain'},
          { displayNames: [{culture: 'en', value: 'Device Name'}], field: 'involvements.devicename'},
          { displayNames: [{culture: 'en', value: 'Vehicle Name'}], field: 'involvements.vehiclename'},
          { displayNames: [{culture: 'en', value: 'License Plate'}], field: 'involvements.licenseplate'},
          { displayNames: [{culture: 'en', value: 'Place Name'}], field: 'involvements.placename'}
        ]
      },
      { displayNames: [{culture: 'en', value: 'Vehicle'}], description: null,
        attributes:  [
          { displayNames: [{culture: 'en', value: 'Vehicle Name'}], field: 'involvements.vehiclename'},
          { displayNames: [{culture: 'en', value: 'License Plate'}], field: 'involvements.licenseplate'},
        ]
      }
    ];

  selectedTypeConfig: any;

  // stucture is of type 
  // {value: , checkBoxes: {value: checked:}[] } []
  checked: any[] = [];

  private subscription: Subscription;
  private cbSelectionChanged = new Subject<any[]>();

  private serviceCall = new Subject<any[]>();
  
  constructor () {

  }

  ngOnInit() {

    const debounceTimeMs = 1700;
    this.subscription = this.cbSelectionChanged.pipe(debounceTime(debounceTimeMs)).subscribe(e => this.onAttributesSelectionChange(e));
   
    // create the internal structure the component needs
    this.dataFromConfigService.forEach(rm =>
    {
      let attributes: any[] = [];
      rm.attributes.forEach(atrb => {
        attributes.push({value: atrb, checked: true});
      })
      this.checked.push({value: rm, attributes: attributes});
    })
    this.selectedTypeConfig = this.checked[1];
    this.currentAttributes = this.checked[1].attributes;
    this.cbSelectionChanged.next(this.checked);

    this.serviceCall.pipe(debounceTime(3000)).subscribe(e => this.refinementSelection = null);
  }

  ngOnChanges() {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public doCheckChange(event: any): void {
    const index = this.currentAttributes.indexOf(event.value);
    if (index !== -1)
    {
      this.currentAttributes[index].checked = event.checked;
    }
    this.cbSelectionChanged.next(this.checked);
  }

  public selectionChanged(event: any): void {
    // this.selectedTypeConfig = event;
    this.currentAttributes = event.attributes;
    this.cbSelectionChanged.next(this.checked);
  }

  public doSelectAll() {
    this.currentAttributes.forEach(a => a.checked = true);
    this.cbSelectionChanged.next(this.checked);
  }

  public doSelectNone() {
    this.currentAttributes.forEach(a => a.checked = false);
    this.cbSelectionChanged.next(this.checked);
  }

  private onAttributesSelectionChange(e: any[]): void {
    this.refinementSelection = '';
    const strs = []; 
    this.currentAttributes.forEach(bm => {
      if (bm.checked) {
        strs.push(bm.value.field);
      }
    });

    this.refinementSelection = strs.join(', ');
    // console.log(this.refinementSelection);
    this.serviceCall.next();
  }

}
