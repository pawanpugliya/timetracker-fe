import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TrackerService } from 'src/app/tracker.service';
import { IRecord } from 'src/app/IRecord';
import { IDetail } from 'src/app/IDetail';

@Component({
  selector: 'app-tracker-form',
  templateUrl: './tracker-form.component.html',
  styleUrls: ['./tracker-form.component.css']
})
export class TrackerFormComponent implements OnInit {

  @Output() detailsUpdated = new EventEmitter<IDetail>();
  @Output() resetResults = new EventEmitter<any>();
  @Output() searchError = new EventEmitter<any>();

  trackerForm = this.fb.group({
    emailAddress: ['', Validators.required],
    option: ['save', Validators.required],
    startTime: [new Date().toISOString().slice(0, -8), Validators.required],
    endTime: [new Date().toISOString().slice(0, -8), Validators.required]
  });

  trackingDetails: IRecord[] = [];
  saveStatus: string = '';
  searchStatus: string = '';


  constructor(private fb:FormBuilder, private trackerService:TrackerService) {
  }

  ngOnInit(): void {
  }

  get f() {
    return this.trackerForm.controls;
  }

  submit() {
    const option = this.trackerForm.value.option;
    this.resetResults.emit(null);

    switch (option) {
      case 'save':
        const record: IRecord = {
          email: this.trackerForm.value.emailAddress,
          start: this.trackerForm.value.startTime,
          end: this.trackerForm.value.endTime
        }

        this.trackerService.saveDetails(record)
          .subscribe(
            data => {
              this.saveStatus = 'success';
              setTimeout(() => {this.saveStatus = ''}, 3000);
            },
            error => {
              this.saveStatus = 'error';
              setTimeout(() => {this.saveStatus = ''}, 3000);
            }
          );
        break;

      case 'search':
        this.trackerService.getDetails(this.trackerForm.value.emailAddress)
          .subscribe(
            data => {
              this.detailsUpdated.emit({ 
                records: data, 
                heading: this.trackerForm.value.emailAddress
              });
            }, error => {
              this.searchStatus = 'error';
              setTimeout(() => {this.searchStatus = ''}, 3000);
            }
          );
        break;
    
      default:
        console.log('Unsupported Option');
    }
  }

  handleTopRecords(e: any) {
    this.resetResults.emit(null);
    this.trackerService.getDetails('')
      .subscribe(
        data => this.detailsUpdated.emit({ records: data, heading: '' }),
        error => this.searchError.emit(null)
      );
  }
}
