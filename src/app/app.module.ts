import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import {AppComponent} from './app.component';
import {SlotMachineComponent} from './components/slot-machine/slot-machine.component';
import {IterablePipe} from './pipes/iterable.pipe';
import {ReelComponent} from './components/reel/reel.component';

@NgModule({
  declarations: [
    AppComponent,
    SlotMachineComponent,
    IterablePipe,
    ReelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
