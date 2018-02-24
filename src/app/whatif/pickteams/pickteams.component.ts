import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Games } from '../../footballish/football-teams.model';

@Component({
  selector: 'app-pickteams',
  templateUrl: './pickteams.component.html',
  styleUrls: ['./pickteams.component.css']
})
export class PickteamsComponent implements OnInit {
  weekForm: FormGroup;
  week = 1;
  games: Games;
  gameForm: FormGroup;
  teams: any[] = [];
  weekAway: Array<Object> = [
    { num: 0, awayTeam: 'Philadelphia Eagles' },
    { num: 1, awayTeam: 'Dallas Cowboys' }
  ];
  weekHome: Array<Object> = [
    { num: 0, homeTeam: 'New England Patriots' },
    { num: 1, homeTeam: 'Dallas Cowboys' }
  ];

  GAME_WEEK_TYPE = {
    AWAY: 'away',
    HOME: 'home'
  };

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.gameForm = this.formBuilder.group({
      weekNum: '',
      teams: this.formBuilder.array([ this.createForm() ])
    });
  }

  initWeekFormGroup () { }

  setGames(games: Games[]) {
    const gameFGs = games.map(game => this.formBuilder.group(Games));
    const gamesFormArray = this.formBuilder.array(gameFGs);
    this.weekForm.setControl('games', gamesFormArray);
  }

  getGames(): FormArray {
    return this.weekForm.get('games') as FormArray;
  }

  initWeekAwayModel() {
    const model = {
      teamNo: '',
      type: 'AWAY',
      teamName: ''
    };
    return model;
  }

  initWeekHomeModel() {
    const model = {
      teamNo: '',
      type: 'HOME',
      teamName: ''
    };
    return model;
  }

  createForm() {
    this.weekForm = this.formBuilder.group({
      week: [1],
      weekgames: this.formBuilder.array([
        this.formBuilder.group({
          away: this.formBuilder.group(this.initWeekAwayModel()),
          home: this.formBuilder.group(this.initWeekHomeModel()),
        }),
      ]),
    });
  }
}
