import { Component, OnInit } from '@angular/core';
import { FootballTeams } from '../football-teams.model';
import { FootballService } from '../football.service';

@Component({
  selector: 'app-football-list-afc',
  templateUrl: './football-list-afc.component.html',
  styleUrls: ['./football-list-afc.component.css']
})
export class FootballListAfcComponent implements OnInit {
  footballistAFC: FootballTeams[] = [];

  constructor(private footballService: FootballService) { }

  ngOnInit() {
    this.footballistAFC = this.footballService.getAFCteams();
  }
}
