import { Component, OnInit } from '@angular/core';
import { FootballTeams } from '../football-teams.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FootballSchedule } from '../football-schedule.model';
import { DatePipe } from '@angular/common';
import { FootballService } from '../football.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-football-schedule',
  templateUrl: './football-schedule.component.html',
  styleUrls: ['./football-schedule.component.css'],
  providers: [DatePipe]
})
export class FootballScheduleComponent implements OnInit {
  footballteamlists: FootballTeams[];
  model: NgbDateStruct;
  date: {year: number, month: number};
  footballschedule: FootballSchedule[] = [];
  footballschedule2: FootballSchedule;
  week: number;

  constructor(private footballService: FootballService,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.footballschedule = this.footballService.footballsch;
    if (!(this.footballschedule.length === 0)) { // this will clean up if
      const z = this.footballschedule.length;
      this.footballschedule.splice(0, z);
    }
  }

  selectToday() {

    let startdate;
    let enddate;
    let resultdate;
    let week = 1;

    for (let i = 0; i < 63; i += 9 ) {
      startdate = this.datePipe.transform(this.model.year + '-' + this.model.month + '-' + (this.model.day + i));
      enddate = this.datePipe.transform(this.model.year + '-' + this.model.month + '-' + (this.model.day + (i + 5 )));
      resultdate = this.datePipe.transform(this.model.year + '-' + this.model.month + '-' + (this.model.day + (i + 9)));
      i -= 2;
      const footballschedule3 =  new FootballSchedule(week, startdate, enddate, resultdate);
      this.footballschedule2 = footballschedule3;
      this.footballService.addFootballSch(this.footballschedule2);
      week += 1 ;
    }
    const ddstart = new Date(startdate);
    const ddend = new Date(enddate);
    const ddresult = new Date(resultdate);
    let z = 2;
    const y = 7;
    let d2, d3, d4;
    // let d3;
    // let d4;
    let footballschedule4;

    for (let i = 9; i < 63; i += 9 ) {
      ddstart.setDate(ddstart.getDate() + (i - z));
      ddend.setDate(ddend.getDate() + (y));
      ddresult.setDate(ddresult.getDate() + (y));
      d2 = this.datePipe.transform(ddstart, 'MMM-dd-yyyy');
      d3 = this.datePipe.transform(ddend, 'MMM-dd-yyyy');
      d4 = this.datePipe.transform(ddresult, 'MMM-dd-yyyy');
      footballschedule4 =  new FootballSchedule(week, d2, d3, d4);
      this.footballschedule2 = footballschedule4;
      this.footballService.addFootballSch(this.footballschedule2);
      z += 7;
      i -= 2;
      week += 1;
    }
    // const strd = this.datePipe.transform(ddstart.getFullYear() + '-' + ddstart.getMonth() + '-' + ddstart.getDay());

    // this.footballschedule.push(this.footballschedule2);
    this.router.navigate(['../', 'showschedule'] , {relativeTo: this.route});
  }


}
