import { Component } from '@angular/core';
import { IRecord } from './IRecord';
import { IDetail } from './IDetail';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  trackingRecords: IRecord[] = [];
  heading: string = '';
  searchStatus: string = '';

  detailsUpdatedHandler(details: IDetail) {
    this.trackingRecords = details.records;
    this.heading = details.heading ? 'Details for ' + details.heading : 'Top-10 records';
  }

  resetResultsHandler(data: any) {
    this.trackingRecords = [];
    this.heading = '';
  }

  searchErrorHandler(data: any) {
    this.searchStatus = 'error';
    setTimeout(() => {
      this.searchStatus = '';
    }, 3000);
  }
}
