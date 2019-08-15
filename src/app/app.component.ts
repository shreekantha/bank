import { Component } from '@angular/core';
import { RequestCache } from './util/request-cache';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'search-bank';

  constructor(private requestCache: RequestCache) {
    requestCache.clear();
    console.log("APp Component ..");
  }


}
