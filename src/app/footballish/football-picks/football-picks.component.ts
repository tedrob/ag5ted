import { Component, OnInit, Input } from '@angular/core';
import { FootballService } from './../football.service';
import { DatePipe } from '@angular/common';
import { FootballSchedule } from './../football-schedule.model';
import { Subscription } from 'rxjs/Subscription';
import { WeeklyGamesAH } from './../football-teams.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-football-picks',
  templateUrl: './football-picks.component.html',
  styleUrls: ['./football-picks.component.scss']
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
    const ddDate = new Date(Date.now());
    ddDate.setDate(ddDate.getDate());
    // this.todaysDate = this.datePipe.transform(Date.now(), this.customFormat);
    this.todaysDate = this.datePipe.transform(ddDate, this.customFormat);
    this.footballSch = this.fbs.getFootballSch();
    if (this.footballSch.length === 0) { // if this is true get the actual season
      this.fbs.getActualSeasonSchedule();
      this.footballSch = this.fbs.getFootballSch();
      this.fbs.setScheduleType('Actual');
      this.scheduleActual = this.fbs.scheduleType;
      console.log('length was 0');
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

    // trying to get the games
    this.wksGames = this.fbs.weekGamesAH;
  }

  /* onSelect(id: number) {
    // this is beging done here because it didn't work in detail
    console.log('inSelect', this.wksGames.length, ' Games Length = ', this.wksGames.length);
    if (this.wksGames.length === 0) {
      console.log('now what to do');
      this.router.navigate(['../../footballish'], {relativeTo: this.route});
    } else {
      if (!(this.wksGames === undefined)) {
        const gms: WeeklyGamesAH[] = [];
        const wk: number = id + 1;
        this.wksGames['weeklyahgms'].forEach((game: WeeklyGamesAH) => {
          if ( game.week === wk) {
            gms.push(game);
          }
        });
        this.currentWksGms = gms;
        console.log('game for week', wk, ' = ', this.currentWksGms);
      }
    }
    console.log('sure', this.currentWksGms);
  } */
  /* ,{"week": 3, "game": 0, "awayTeamNo": 20, "homeTeamNo": 24},
        {"week": 3, "game": 1, "awayTeamNo": 18, "homeTeamNo": 5},
        {"week": 3, "game": 2, "awayTeamNo": 3, "homeTeamNo": 28},
        {"week": 3, "game": 3, "awayTeamNo": 7, "homeTeamNo": 4},
        {"week": 3, "game": 4, "awayTeamNo": 16, "homeTeamNo": 29},
        {"week": 3, "game": 5, "awayTeamNo": 31, "homeTeamNo": 19},
        {"week": 3, "game": 6, "awayTeamNo": 27, "homeTeamNo": 1},
        {"week": 3, "game": 7, "awayTeamNo": 26, "homeTeamNo": 25},
        {"week": 3, "game": 8, "awayTeamNo": 23, "homeTeamNo": 10},
        {"week": 3, "game": 9, "awayTeamNo": 32, "homeTeamNo": 22},
        {"week": 3, "game": 10, "awayTeamNo": 9, "homeTeamNo": 11},
        {"week": 3, "game": 11, "awayTeamNo": 30, "homeTeamNo": 13},
        {"week": 3, "game": 12, "awayTeamNo": 8, "homeTeamNo": 15},
        {"week": 3, "game": 13, "awayTeamNo": 2, "homeTeamNo": 14},
        {"week": 3, "game": 14, "awayTeamNo": 17, "homeTeamNo": 6},
        {"week": 3, "game": 15, "awayTeamNo": 21, "homeTeamNo": 12}
 */
}
