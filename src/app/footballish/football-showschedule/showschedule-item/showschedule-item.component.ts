import { Component, OnInit, Input } from '@angular/core';
import { FootballSchedule } from '../../football-schedule.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-showschedule-item',
  templateUrl: './showschedule-item.component.html',
  styleUrls: ['./showschedule-item.component.css'],
  providers: [DatePipe]
})
export class ShowscheduleItemComponent implements OnInit {
  @Input() footballSchedule: FootballSchedule;
  @Input() index: number;
  todaysDate;
  scheduleDate;
  customFormat = 'MM dd, yyyy';

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    this.todaysDate = this.datePipe.transform(Date.now(), this.customFormat);
    this.scheduleDate = this.datePipe.transform(this.footballSchedule.endentrydate, this.customFormat);
  }

}
