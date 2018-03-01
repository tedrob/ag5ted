import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
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

  week = 1;

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
      weekAway: this.formBuilder.array([]),
      weekHome: this.formBuilder.array([]),
      gameMethod: this.initWeekFormArray()
    });
    this.addAwayGame();
    this.addHomeGame();
    console.log('weekF', this.weekForm['controls'].gameMethod);
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
    console.log('array', arrayForm);
    return arrayForm;
  }

  initWeekFormGroup() {
    const groupForm = this.formBuilder.group({
      type: '',
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
    console.log('in set ctrl ', ctrl);
  }

  // --------------------------
  addAwayGame() {
    const teamAway = <FormArray>this.weekForm.controls['weekAway'];
    // let newA;
    let tmno;
    let ttype;
    let tname;
    for (let i = 0; i < 16; i++) {
      tmno = this.teamsA[i].teamnumber;
      ttype = '';
      tname = this.teamsA[i].name;
      teamAway.push(
        this.formBuilder.group({
          teamNo: new FormControl(tmno),
          type: new FormControl(ttype),
          name: new FormControl(tname)
        })
      );
      // console.log('tttt', teamAway.controls[i].value);
    }
  }

  addHomeGame() {
    const teamHome = <FormArray>this.weekForm.controls['weekHome'];
    // let newA;
    let tmno;
    let ttype;
    let tname;
    for (let i = 0; i < 16; i++) {
      tmno = this.teamsH[i].teamnumber;
      ttype = '';
      tname = this.teamsH[i].name;
      teamHome.push(
        this.formBuilder.group({
          teamNo: new FormControl(tmno),
          type: new FormControl(ttype),
          name: new FormControl(tname)
        })
      );
    }
  }

  get weekAway(): FormArray {
    return this.weekForm.get('weekHome') as FormArray;
  }

  get weekHome(): FormArray {
    return this.weekForm.get('weekHome') as FormArray;
  }

  get gameMethod(): FormArray {
    return this.gameMethod.get('gameMethod') as FormArray;
  }

  setGameMethodAwayType(index: number, type) {
    const ctlType: FormGroup = (<any>this.weekForm).controls.weekAway.controls[index].controls.type;
    const ctlTypeH: FormGroup = (<any>this.weekForm).controls.weekHome.controls[index].controls.type;
    ctlType.setValue(type);
    ctlType.markAsTouched();
    ctlTypeH.reset();
    ctlTypeH.markAsTouched();
    console.log('away value', ctlType.value);
    console.log('ctl idx', index);
    console.log('home value', ctlTypeH.value);

    console.log('status', ctlType);
    console.log('status', ctlTypeH);
  }

  setGameMethodHomeType(index: number, type) {
    const ctl: FormGroup = (<any>this.weekForm).controls.weekHome.controls[index].controls.type;
    const ctlA: FormGroup = (<any>this.weekForm).controls.weekAway.controls[index].controls.type;
    ctl.setValue(type);
    ctl.markAsTouched();
    ctlA.reset();
    ctlA.markAsTouched();
    console.log('home value', ctl.value);
    console.log('ctl idx', index);
    console.log('away value', ctlA.value);
    ctl.markAsTouched();

    console.log('status', ctl.touched);
    console.log('value', ctl.valueChanges);

  }

  onSubmit() {
    console.log('onSubmit');
  }


  ngOnInit() {
    this.createForm();
    console.log('weekAway', this.weekAway);
    console.log('weekHome', this.weekHome);
    // console.log('gameWeek', this.gameMethod);
  }

  ngOnChanges() {
    console.log('onChanges');
    this.weekForm.reset();
  }
}

