import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Games, Game } from '../../footballish/football-teams.model';
import { FootballService } from '../../footballish/football.service';

@Component({
  selector: 'app-pickteams',
  templateUrl: './pickteams.component.html',
  styleUrls: ['./pickteams.component.css']
})
export class PickteamsComponent implements OnInit, OnChanges {
  weekForm: FormGroup;
  gameForm: FormGroup;
  // gameWeekValid: any[] = [];
  submitted = false;

  week = 1;
/*   game = {
    week: '',
    type: '',
    teamName: ''
  }; */
  weeksGames: any[] = [];

  teams: any[] = [];
  teamsA: any[] = [];
  teamsH: any[] = [];
  modelAway = [];
  modelHome = [];
  awayListArray: FormArray;

  public GAME_WEEK_TYPE = {
    AWAY: 'away',
    HOME: 'home',
  };

  constructor(private formBuilder: FormBuilder, private fs: FootballService) {
    // this.createForm();
  }

  createForm() {
    this.teamsA = this.fs.getAFCteams();
    this.teamsH = this.fs.getNFCteams();

    this.weekForm = this.formBuilder.group({
      week: [1],
      gameMethod: this.initWeekFormArray()
    });
  }

  initWeekFormArray() {
    const arrayForm = this.formBuilder.array([]);
    for (let i = 0; i < 8; i++) {
      const group = this.initWeekFormGroup();
      group.patchValue({
        away: {
          type: '',
          teamNo: this.teamsA[i].teamnumber,
          teamName: this.teamsA[i].name,
        },
        home: {
          type: '',
          teamNo: this.teamsH[i].teamnumber,
          teamName: this.teamsH[i].name,
        },
      });
      arrayForm.push(group);
    }
    return arrayForm;
  }

  initWeekFormGroup() {
    const groupForm = this.formBuilder.group({
      type: ['', Validators.required],
      away: this.formBuilder.group(this.initAModel()),
      home: this.formBuilder.group(this.initHModel()),
    });
    return groupForm;
  }

  initAModel () {
    const model = {
      type: 'AWAY',
      teamNo: '',
      teamName: ''
    };
    return model;
  }

  initHModel () {
    const model = {
      type: 'HOME',
      teamNo: '',
      teamName: ''
    };
    return model;
  }

  setGameMethodType(i, type1) {
    const ctrl: FormGroup = (<any>this.weekForm).controls.gameMethod;
    ctrl.controls[i].patchValue({type: type1});
    ctrl.controls[i].get('type').markAsTouched();
/*     console.log('type', ctrl.controls[i].get('type').value);
    console.log('touched', ctrl.controls[i].get('type').touched);
    console.log('touched', ctrl.controls[i].get('type').status);
    console.log('in set ctrl type', ctrl.controls[i].touched);
    console.log('in set ctrl ', ctrl.controls[i]['controls'].type.value, i, type1); */
    // this.gameWeekValid.push('game ' + i + ' type ' + type1);
  }

  get gameMethod(): FormArray {
    return this.gameMethod.get('gameMethod') as FormArray;
  }

  onSubmit() {
    this.submitted = true;
    const lnth = this.weekForm.controls.gameMethod['controls'].length;
    const week = this.weekForm.controls.week.value;

    let team;
    let wktype;
    let wkteam;
    const subarray = [];
    const subarray2 = [];
    for (let i = 0; i < lnth; i++) {
      wktype = this.weekForm.controls.gameMethod['controls'][i].get('type').value;
      if (wktype === 'home') {
        team = this.weekForm.controls.gameMethod['controls'][i];
        wkteam = team.controls.home['controls'].teamName.value;
        subarray.push(wkteam);
      } else {
        team = this.weekForm.controls.gameMethod['controls'][i];
        wkteam = team.controls.away['controls'].teamName.value;
        subarray.push(wkteam);
      }
    }
    this.weeksGames.push(subarray);
    console.log('week games', this.weeksGames);

     this.createForm();
     // this.gameWeekValid.splice(0);
  }


  ngOnInit() {
    this.createForm();
    // console.log('gameWeek', this.gameMethod);
  }

  ngOnChanges() {
    console.log('onChanges');
    this.weekForm.reset();
  }
}

