import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CheckBoxComponent } from './check-box/check-box/check-box.component';
import { RadioButtonComponent } from './radio-button/radio-button/radio-button.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, CheckBoxComponent, RadioButtonComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
