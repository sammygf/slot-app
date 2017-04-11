import { Component } from '@angular/core';
import {BackEndService} from './services/back-end/back-end.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.sass'],
  providers: [BackEndService]
})
export class AppComponent {
  title = 'app works!';
}
