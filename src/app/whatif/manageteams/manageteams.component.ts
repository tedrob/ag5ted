import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { FootballService } from '../../footballish/football.service';
import { FootballTeams } from '../../footballish/football-teams.model';

@Component({
  selector: 'app-manageteams',
  templateUrl: './manageteams.component.html',
  styleUrls: ['./manageteams.component.css']
})
export class ManageteamsComponent implements OnInit, OnDestroy {
  footballTeams: FootballTeams[] = [];
  footballTeams2: FootballTeams[];
  subscription: Subscription;

  constructor(private footballService: FootballService) { }

  ngOnInit() {
    this.subscription = this.footballService.getTeamsFile()
      .subscribe(response => {
        this.footballTeams =  response['teams'].slice(0, 16);
        this.footballTeams2 =  response['teams'].slice(16);
        // console.log('teams', this.footballTeams[0].name);
        // console.log('teams', this.footballTeams2[0].name);
      });
  }

  ngOnDestroy() { this.subscription.unsubscribe(); }
}
