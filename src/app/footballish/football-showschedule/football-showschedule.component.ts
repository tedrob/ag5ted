import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FootballSchedule } from '../football-schedule.model';
import { FootballService } from '../football.service';

@Component({
  selector: 'app-football-showschedule',
  templateUrl: './football-showschedule.component.html',
  styleUrls: ['./football-showschedule.component.css']
})
export class FootballShowscheduleComponent implements OnInit {
  footballschs: FootballSchedule[];
  subscription: Subscription;

  constructor(private fbs: FootballService) { }

  ngOnInit() {
    this.subscription = this.fbs.footballSchChanged
      .subscribe(
        (footballSchedules: FootballSchedule[]) => {
          this.footballschs = footballSchedules;
        }
      );
    this.footballschs = this.fbs.footballsch.slice();
    // this.footballschs.splice(this.footballschs.length - 1, 1);
  }

}
