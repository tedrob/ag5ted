import { Component, OnInit } from '@angular/core';
import { FootballTeams } from './football-teams.model';
import { FootballService } from './football.service';
import { FootballSchedule } from './football-schedule.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-footballish',
  templateUrl: './footballish.component.html',
  styleUrls: ['./footballish.component.css']
})
export class FootballishComponent implements OnInit {
  footballteamlists: FootballTeams[];

  constructor(private footballService: FootballService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.footballteamlists = this.footballService.getTeams();
  }

  startSchedule() {
    this.router.navigate(['schedule'], {relativeTo: this.route});
  }

}
