import { Component, OnInit, Input } from '@angular/core';
import { FootballSchedule } from '../../football-schedule.model';
import { FootballService } from './../../football.service';
import { DatePipe } from '@angular/common';
import { WeeklyGamesAH, WeeklyGmsAHNames } from '../../football-teams.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-picks-item',
  templateUrl: './picks-item.component.html',
  styleUrls: ['./picks-item.component.scss']
})
export class PicksItemComponent implements OnInit {
  @Input() fbSchedule: FootballSchedule;
  @Input() index: number;
  @Input() currentWksGms: WeeklyGamesAH[];
  @Input() curWksGmsName: WeeklyGmsAHNames[];
  footballSch: FootballSchedule[];
  wksGames: WeeklyGamesAH[];
  todaysDate;
  scheduleDate;
  customFormat = 'MM dd, yyyy';

  constructor(private fbs: FootballService,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.todaysDate = this.datePipe.transform(Date.now(), this.customFormat);
    this.footballSch = this.fbs.getFootballSch();

    if (this.footballSch.length === 0) { // if this is true get the actual season
      this.fbs.getActualSeasonSchedule();
      this.footballSch = this.fbs.getFootballSch();
      this.fbs.setScheduleType('Actual');
      console.log('length was 0', this.footballSch.length , 'oops');
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

  onSelect(id: number) {
    let gmwk = +id;
    if (this.wksGames.length === 0) { // resets to main feature page because the form was reset (need to reget data)
      // console.log('now what to do');
      this.router.navigate(['../../footballish'], {relativeTo: this.route});
    } else {
      if (!(this.wksGames === undefined)) {
        const gms: WeeklyGamesAH[] = [];
        const wk: number = this.footballSch[id].week;
        this.wksGames['weeklyahgms'].forEach((gm) => {
          if ( gm.week === wk) {
            gms.push(gm);
          }
        });
        this.currentWksGms = gms;
        this.fbs.setCurWksGames(gms);
        gmwk = gmwk + 1;
        // console.log('inselect', gmwk);
        this.fbs.setCurWksForm(gmwk);

      }
    }
    // console.log('sure', this.currentWksGms, ' names ', this.fbs.curWksGmsAHNames);
  }
}
