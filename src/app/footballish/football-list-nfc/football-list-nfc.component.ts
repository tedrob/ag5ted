import { Component, OnInit } from '@angular/core';
import { FootballTeams } from '../football-teams.model';
import { FootballService } from '../football.service';

@Component({
  selector: 'app-football-list-nfc',
  templateUrl: './football-list-nfc.component.html',
  styleUrls: ['./football-list-nfc.component.css']
})
export class FootballListNfcComponent implements OnInit {
  footballistNFC: FootballTeams[] = [];

  constructor(private footallService: FootballService) { }

  ngOnInit() {
    this.footballistNFC = this.footallService.getNFCteams();
  }
}
