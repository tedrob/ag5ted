import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FootballService } from './../football.service';
import { FootballSchedule } from './../football-schedule.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-football-actual',
  templateUrl: './football-actual.component.html',
  styleUrls: ['./football-actual.component.css'],
  providers: [DatePipe]
})
export class FootballActualComponent implements OnInit {
  date: Date;
  dateYr: number;
  dateMth: number;
  dateDay: number;
  footballschedule: FootballSchedule[];
  footballschedule2: FootballSchedule;

  constructor(private fbs: FootballService,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.footballschedule = this.fbs.footballsch;
    // this will clean up schedule dates if run more than once
    if (!(this.footballschedule.length === 0)) {
      const z = this.footballschedule.length;
      this.footballschedule.splice(0, z);
    }
    this.fbs.getActualSeasonSchedule();
  }

  setSeasonStart() {

    this.fbs.getActualSeasonSchedule();

    this.router.navigate(['../', 'showschedule'] , {relativeTo: this.route});
  }

}
