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
  footballschedule: FootballSchedule[] = [];
  footballschedule2: FootballSchedule;
  week: number;

  constructor(private footballService: FootballService,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  selectToday() {
    console.log(this.model);
    let startdate;
    let endDate;
    let resultDate;
    let week = 0;

    for (let i = 0; i < 27; i += 9 ) {
      startdate = this.datePipe.transform(this.model.year + '-' + this.model.month + '-' + (this.model.day + i));
      endDate = this.datePipe.transform(this.model.year + '-' + this.model.month + '-' + (this.model.day + (i + 5 )));
      resultDate = this.datePipe.transform(this.model.year + '-' + this.model.month + '-' + (this.model.day + (i + 9)));
      i -= 2;
      console.log('start day ' + startdate);
      console.log('end entry day ' + endDate);
      console.log('results day ' + resultDate);
      week += 1 ;

      const footballschedule3 =  new FootballSchedule(week, startdate, endDate, resultDate);
      this.footballschedule2 = footballschedule3;
      console.log('in schedule ', footballschedule3);
      this.footballService.addFootballSch(this.footballschedule2);
      }

      this.footballschedule.push(this.footballschedule2);
      console.log(' test ' + this.footballService.getFootballSch.length);

      this.router.navigate(['../', 'showschedule'] , {relativeTo: this.route});
  }


}
