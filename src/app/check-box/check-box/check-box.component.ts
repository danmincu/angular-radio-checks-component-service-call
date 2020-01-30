import { Component, Input, Output, EventEmitter, NgModule } from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: [ './check-box.component.scss' ]
})
export class CheckBoxComponent  {

  @Input() value: any;
  @Input() label: 'undefined label';
  @Input() imageUrl: string;

  @Output() checkChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() check;

  onClick(): void {
     this.check = !this.check;
     // console.log("value" + JSON.stringify(this.value));
     this.checkChange.emit( {checked: this.check, value: this.value} );

  }
}
