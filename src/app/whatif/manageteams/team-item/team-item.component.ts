import { Component, OnInit, Input } from '@angular/core';
import { FootballTeams } from '../../../footballish/football-teams.model';

@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.css']
})
export class TeamItemComponent implements OnInit {
  @Input() team: FootballTeams;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
