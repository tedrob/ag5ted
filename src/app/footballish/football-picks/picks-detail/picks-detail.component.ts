import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FootballService } from '../../football.service';
import { FootballSchedule } from './../../football-schedule.model';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { WeeklyGamesAH, WeeklyGmsAHNames, FootballTeams } from './../../football-teams.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-picks-detail',
  templateUrl: './picks-detail.component.html',
  styleUrls: ['./picks-detail.component.scss']
})
export class PicksDetailComponent implements OnInit, OnDestroy {
  footballSch: FootballSchedule;
  wksGames: WeeklyGamesAH[];
  wklyGmsAhName: WeeklyGmsAHNames[];

  id: number;
  wklyGmsAH: WeeklyGamesAH[];
  weekForm: FormGroup;
  subscriptionR: Subscription;
  // teams: FootballTeams[];

  public GAME_WEEK_TYPE = {
    'AWAY': 'away',
    'HOME': 'home',
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fbs: FootballService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.subscriptionR = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.footballSch = this.fbs.getFootballSchwk(this.id);
          this.wklyGmsAH = this.fbs.getCurWksGames(); // team numbers
          this.wklyGmsAhName = this.fbs.curWksGmsAHNames; // .getWksGmsNames();
          this.weekForm = this.fbs.weekForm; //
        }
      ); //
    }

  get gameMethod(): FormArray {
    return this.gameMethod.get('gameMethod') as FormArray;
  }

  setGameMethodType(i, type1) { //
    const ctrl: FormGroup = (<any>this.weekForm).controls.gameMethod;
    ctrl.controls[i].patchValue({type: type1});
    ctrl.controls[i].get('type').markAsTouched();
  }

  initModelFormGroup () {
    const model = this.formBuilder.group({
      'week': new FormControl(null), // current week
      'game': new FormControl(null), // game of week
      'type': new FormControl(null), // home or away
      'teamNo': new FormControl(null),
      'teamName': new FormControl(null),
      'teamShortNm': new FormControl  // teams short name
    });
    return model;
  }

  onSubmit() {
    const lngth = this.weekForm.controls.gameMethod['controls'].length;
    const week = this.weekForm.controls.week.value;
    const arrayForm = this.formBuilder.array([]);
    const tms = this.fbs.getTeams();
    this.weekForm.controls.gameMethod['controls'].forEach(gm => {
      const group = this.initModelFormGroup();
      if (gm['controls'].type.value === 'away') {
        group.patchValue({
          'week': week,
          'game': gm['controls'].game.value,
          'type': gm['controls'].type.value,
          'teamNo': gm['controls'].away['controls'].teamNo.value,
          'teamName': gm['controls'].away['controls'].teamName.value,
          'teamShortNm': tms.find(x => x.name === gm['controls'].away['controls'].teamName.value).shortName
        });
      } else if ( gm['controls'].type.value === 'home' ) {
        group.patchValue({
          'week': week,
          'game': gm['controls'].game.value,
          'type': gm['controls'].type.value,
          'teamNo': gm['controls'].home['controls'].teamNo.value,
          'teamName': gm['controls'].home['controls'].teamName.value,
          'teamShortNm': tms.find(x => x.name === gm['controls'].home['controls'].teamName.value).shortName
        });
      }
      arrayForm.push(group);
    });
    // console.log('array', arrayForm);

    // console.log('submitted2', week, ' id ', this.id);
    this.fbs.addArrayFormGames(arrayForm);
    this.router.navigate(['../pickedgames'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscriptionR.unsubscribe();
  }

}
