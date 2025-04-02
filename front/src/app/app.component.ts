import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Icon1Component } from './icon1/icon1.component';
import { Icon2Component } from './icon2/icon2.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Icon1Component, Icon2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';
}
