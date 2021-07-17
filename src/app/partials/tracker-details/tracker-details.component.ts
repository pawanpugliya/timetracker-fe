import { Component, OnInit, Input } from '@angular/core';
import { IRecord } from 'src/app/IRecord';
import { TrackerService } from 'src/app/tracker.service';

@Component({
  selector: 'app-tracker-details',
  templateUrl: './tracker-details.component.html',
  styleUrls: ['./tracker-details.component.css']
})
export class TrackerDetailsComponent implements OnInit {

  @Input() records: IRecord[] = [];
  @Input() heading: string = '';

  constructor(private trackerService: TrackerService) { }

  ngOnInit(): void {
  }
}
