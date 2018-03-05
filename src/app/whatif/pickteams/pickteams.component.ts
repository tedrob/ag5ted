import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Games, Game, WeeklyGame } from '../../footballish/football-teams.model';
import { FootballService } from '../../footballish/football.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pickteams',
  templateUrl: './pickteams.component.html',
  styleUrls: ['./pickteams.component.css']
})
export class PickteamsComponent implements OnInit, OnChanges {
  weekForm: FormGroup;
  gameForm: FormGroup;
  submitted = false;
  weeklyGames: WeeklyGame[];
  weekGame: FormGroup = this.formBuilder.group(this.initModelFormGroup());

  week = 1;
  weeksGames = [];

  teams: any[] = [];
  teamsA: any[] = [];
  teamsH: any[] = [];

/*   modelAway = [];
  modelHome = [];
  awayListArray: FormArray; */

  public GAME_WEEK_TYPE = {
    AWAY: 'away',
    HOME: 'home',
  };

  constructor(private formBuilder: FormBuilder,
              private fs: FootballService,
              private route: ActivatedRoute,
              private router: Router) {
    // this.createForm();
  }

  initModelFormGroup () {
    const model = this.formBuilder.group({
      week: 0,
      type: '',
      teamNo: '',
      teamName: ''
    });
    return model;
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
  }

  get gameMethod(): FormArray {
    return this.gameMethod.get('gameMethod') as FormArray;
  }

  onSubmit() {
    this.submitted = true;
    const lnth = this.weekForm.controls.gameMethod['controls'].length;
    const week = this.weekForm.controls.week.value;
    const arrayForm = this.formBuilder.array([]);

    let team;
    let wktype;
    let wkteam;
    this.weeksGames.splice(0, this.weeksGames.length);
    for (let i = 0; i < lnth; i++) {
      wktype = this.weekForm.controls.gameMethod['controls'][i].get('type').value;
      const group = this.initModelFormGroup();
      if (wktype === 'home') {
        team = this.weekForm.controls.gameMethod['controls'][i];
        wkteam = team.controls.home['controls'].teamName.value;
        group.patchValue({
          week: week,
          teamNo: i + 1,
          type: wktype,
          teamName: wkteam
        });
        arrayForm.push(group);
      } else {
        team = this.weekForm.controls.gameMethod['controls'][i];
        wkteam = team.controls.away['controls'].teamName.value;
        group.patchValue({
          week: week,
          teamNo: i + 1,
          type: wktype,
          teamName: wkteam
        });
        arrayForm.push(group);
      }
    }
    console.log('array', arrayForm);
    this.fs.addArrayFormGames(arrayForm);
    this.weekForm.reset();
    this.createForm();
    this.router.navigate(['../showgames'], {relativeTo: this.route});
  }

  ngOnInit() { this.createForm(); }

  ngOnChanges() {
    console.log('onChanges');
    this.weekForm.reset();
  }
}

