import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [DatePipe]
})
export class ScheduleComponent implements OnInit {
date;
enddate;
customFormat = 'MMM dd, yyyy';
  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    this.date = this.datePipe.transform(Date.now(), this.customFormat);
    const dd = new Date();
    console.log('getdate ', dd.getDay());
    dd.setDate(dd.getDate() - (dd.getDay() + 2));
    console.log('getdate ', dd.getDay());
    this.enddate = this.datePipe.transform(dd, this.customFormat);
  }

}
