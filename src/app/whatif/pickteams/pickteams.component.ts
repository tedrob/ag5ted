import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Games } from '../../footballish/football-teams.model';
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

  GAME_WEEK_TYPE = {
    AWAY: 'away',
    HOME: 'home'
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
      weekHome: this.formBuilder.array([])
    });
    this.addAwayGame();
    this.addHomeGame();
  }

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
      console.log('tttt', teamAway.controls[i].value);
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
      console.log('tttt', teamHome.controls[i].value);
    }
  }

  get weekAway(): FormArray {
    return this.weekForm.get('weekAway') as FormArray;
  }

  get weekHome(): FormArray {
    return this.weekForm.get('weekHome') as FormArray;
  }

  setWeekMethodType(type) {
    const ctrl: FormGroup = (<any>this.weekForm).controls.weekMethod.controls.type;
    ctrl.setValue(type);
    console.log('in set ctrl ', type);
  }

  setGameMethodAwayType(index: number, type: string) {
    const ctl: FormGroup = (<any>this.weekForm).controls.weekAway.controls;
    const ctlh: FormGroup = (<any>this.weekForm).controls.weekHome.controls;
    console.log('ctl idx', index);
    console.log('ctl num ', ctl[index].controls.teamNo.value);
    console.log('ctl type', ctl[index].controls.type.value);
    ctl[index].controls.type.setValue(type, true); // = true;
    ctlh[index].controls.type.setValue();
    console.log('ctl type after set', ctl[index].controls.type.value);
    console.log('ctlh type after set', ctlh[index].controls.type.value);
    console.log('ctl type param', type);
    console.log('status', ctl.status);
    console.log('value', ctl.value);

    ctlh[index].controls.type.reset();
  }

  setGameMethodHomeType(index: number, type) {
    const ctl: FormGroup = (<any>this.weekForm).controls.weekHome.controls;
    const ctla: FormGroup = (<any>this.weekForm).controls.weekAway.controls;
    console.log('ctl idx ', index);
    console.log('ctl num', ctl[index].controls.teamNo.value);
    console.log('ctla type', ctla[index].controls.type.value);
    ctl[index].controls.type.setValue(type, Touch); // = true;
    ctla[index].controls.type.setValue();
    console.log('ctl type after set', ctl[index].controls.type.value);
    console.log('ctla type after set', ctla[index].controls.type.value);
    console.log('ctl type param', type);
    console.log('status', ctl.touched);
    console.log('value', ctl.valueChanges);

    ctla[index].controls.type.reset();
  }


  ngOnInit() {
    this.createForm();
  }

  ngOnChanges() {
    console.log('onChanges');
    this.weekForm.reset();
  }

  initWeekFormGroup () { }

}
