import { Component, OnInit, Input } from '@angular/core';
import { FootballService } from './../football.service';
import { DatePipe } from '@angular/common';
import { FootballSchedule } from './../football-schedule.model';
import { Subscription } from 'rxjs';
import { WeeklyGamesAH } from './../football-teams.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-football-picks',
  templateUrl: './football-picks.component.html',
  styleUrls: ['./football-picks.component.css']
})
export class FootballPicksComponent implements OnInit {
  @Input() fbSchedule: FootballSchedule;
  @Input() index: number;
  scheduleActual;
  weekDate;
  todaysDate;
  scheduleDate;
  customFormat = 'MM dd, yyyy';
  footballSch: FootballSchedule[];
  @Input() wksGames: WeeklyGamesAH[];
  currentWksGms: WeeklyGamesAH[];

  constructor(private fbs: FootballService,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              private router: Router) {
                this.scheduleActual = this.fbs.scheduleType;
              }

  ngOnInit() {
    const ddDate = new Date(Date.now()); // used to determine where in the season is (which week 1-17)
    ddDate.setDate(ddDate.getDate());
    // this.todaysDate = this.datePipe.transform(Date.now(), this.customFormat);
    this.todaysDate = this.datePipe.transform(ddDate, this.customFormat);
    this.footballSch = this.fbs.getFootballSch();
    if (this.footballSch.length === 0) { // if this is true get the actual season
      this.fbs.getActualSeasonSchedule();
      this.footballSch = this.fbs.getFootballSch();
      this.fbs.setScheduleType('Actual');
      this.scheduleActual = this.fbs.scheduleType;
      // console.log('length was 0');
    }
    this.scheduleDate = this.datePipe.transform(this.footballSch[0].endentrydate, this.customFormat);
    // this sections sets the available scheduled weeks.
    let ftbs: FootballSchedule;
    const newFtbsch: FootballSchedule[] = [];
    this.footballSch.forEach((sch) => {
      const enddate = this.datePipe.transform(sch.endentrydate, this.customFormat);
      if (enddate >= this.todaysDate) {
        ftbs = sch;
        newFtbsch.push(ftbs);
      }
    });
    this.footballSch = newFtbsch;
    this.fbs.setFootballSch(newFtbsch);
    this.wksGames = this.fbs.weekGamesAH;
  }


}
