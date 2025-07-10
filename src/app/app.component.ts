import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HolaUpsComponent } from './componet/hola-ups.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HolaUpsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angulardemo';
}
