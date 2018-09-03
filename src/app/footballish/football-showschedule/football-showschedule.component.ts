import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { FootballSchedule } from '../football-schedule.model';
import { FootballService } from '../football.service';
import { WeeklyGamesAH } from './../football-teams.model';


@Component({
  selector: 'app-football-showschedule',
  templateUrl: './football-showschedule.component.html',
  styleUrls: ['./football-showschedule.component.css']
})
export class FootballShowscheduleComponent implements OnInit, OnDestroy {
  footballschs: FootballSchedule[];
  subscription: Subscription;
  weeksGamesAH: WeeklyGamesAH[];

  constructor(private fbs: FootballService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.fbs.footballSchChanged
      .subscribe(
        (footballSchedules: FootballSchedule[]) => {
          this.footballschs = footballSchedules;
        }
      );
    this.footballschs = this.fbs.footballsch.slice();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
