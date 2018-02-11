import { Component, OnInit, Input } from '@angular/core';
import { FootballTeams } from '../../football-teams.model';

@Component({
  selector: 'app-afc-item',
  templateUrl: './afc-item.component.html',
  styleUrls: ['./afc-item.component.css']
})
export class AfcItemComponent implements OnInit {
  @Input() afcTeam: FootballTeams;

  constructor() { }

  ngOnInit() {
  }

}
