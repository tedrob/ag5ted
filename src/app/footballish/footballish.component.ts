import { Component, OnInit } from '@angular/core';
import { FootballTeams, WeeklyGames, WeeklyGamesAH } from './football-teams.model';
import { FootballService } from './football.service';
import { FootballSchedule } from './football-schedule.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-footballish',
  templateUrl: './footballish.component.html',
  styleUrls: ['./footballish.component.css']
})
export class FootballishComponent implements OnInit {
  footballteamlists: FootballTeams[];
  weeklyGames: WeeklyGamesAH[];
  wklyGmsAh: WeeklyGamesAH[];
  subscription: Subscription;
  manageTeams = true;

  constructor(private footballService: FootballService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // this sets all the season weeks(17) games
    this.subscription = this.footballService.getWklyGmsAH()
      .subscribe((wksgms: WeeklyGamesAH[]) => {
        this.wklyGmsAh = this.wklyGmsAh;
        return wksgms;
      });
  }

  startSchedule() {
    this.router.navigate(['schedule'], {relativeTo: this.route});
  }

  actualSchedule() {
    this.footballService.setScheduleType('actual');
    this.router.navigate(['actualschedule'], {relativeTo: this.route});
  }

  pickTeams() {
    this.router.navigate(['pickteams'], {relativeTo: this.route});
  }

}
