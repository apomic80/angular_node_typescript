import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(httpClient: HttpClient) {

    httpClient.get<string>('http://localhost:3000/api/test')
      .subscribe(arg => this.title = arg);

  }
}
