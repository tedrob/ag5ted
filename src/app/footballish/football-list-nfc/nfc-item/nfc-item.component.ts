import { Component, OnInit, Input } from '@angular/core';
import { FootballTeams } from '../../football-teams.model';

@Component({
  selector: 'app-nfc-item',
  templateUrl: './nfc-item.component.html',
  styleUrls: ['./nfc-item.component.css']
})
export class NfcItemComponent implements OnInit {
  @Input() nfcTeam: FootballTeams;

  constructor() { }

  ngOnInit() {
  }

}
