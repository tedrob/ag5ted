import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Games } from '../../footballish/football-teams.model';
import { FootballService } from '../../footballish/football.service';

@Component({
  selector: 'app-pickteams',
  templateUrl: './pickteams.component.html',
  styleUrls: ['./pickteams.component.css']
})
export class PickteamsComponent implements OnInit {
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
    for (let i = 0; i < 2; i++) {
      tmno = this.teamsA[i].teamnumber;
      ttype = 'AWAY';
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
    for (let i = 0; i < 2; i++) {
      tmno = this.teamsH[i].teamnumber;
      ttype = 'Home';
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


  createAwayForm() {
    for (let i = 0; i < 2; i++) {
      const modelA = {
        teamNo: this.teamsA[i].teamnumber,
        type: 'AWAY',
        teamName: this.teamsA[i].name
      };
      this.modelAway.push(modelA);
    }
    console.log('modela ', this.modelAway);
    // this.awayListArray = this.weekForm.get('weekAway') as FormArray;
    // console.log('al', this.awayListArray);
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

  setGameMethodType(index: number) {
    const ctl: FormGroup = (<any>this.weekForm).controls.weekAway.controls;
    console.log('in ctrl ', index);
    console.log('ctrl = ', ctl[index]);
  }

  ngOnInit() {
    this.createForm();
  }

  initWeekFormGroup () { }

}
