import { Component, OnInit, Input, forwardRef, Renderer, ViewChild, ElementRef, Injector, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true,
    }
  ]
})
export class RadioButtonComponent implements OnInit, ControlValueAccessor  {

  @Input() label: string;
  @Input() description: string;
  @Input() name: string;
  @Input() value: any;

  public checked: boolean;
 
  private changed = (_: any) => { };

  constructor() {}

  ngOnInit() {
  }

  onClick() {
    this.checked = true;
    this.changed(this.value);
  }
  /**
   * @description
   * Sets the "checked" property value on the radio input element.
   *
   * @param value The checked value
   */
  writeValue(value: any): void {    
    if (value == null) {    
      return;
    }
  //  console.log('value =' + JSON.stringify(value.value.displayNames[0].value));
  //  console.log('this.value =' + JSON.stringify(this.value.value.displayNames[0].value));

    this.checked = value === this.value;
  //  console.log(this.checked);
    
  }

  setDisabledState?(isDisabled: boolean): void {
  }


  registerOnChange(fn) {
    this.changed = fn;
  }

  registerOnTouched() {
  }

}
