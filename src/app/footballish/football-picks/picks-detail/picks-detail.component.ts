import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FootballService } from '../../football.service';
import { FootballSchedule } from './../../football-schedule.model';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { WeeklyGamesAH, WeeklyGmsAHNames } from './../../football-teams.model';
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
  // subscriptionW: Subscription;
  // subscptnWks: Subscription;

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
          this.weekForm = this.fbs.weekForm;
          console.log('wk form0', this.weekForm);
        }
      );
      // console.log('wk form1', this.weekForm);
  }

  get gameMethod(): FormArray {
    return this.gameMethod.get('gameMethod') as FormArray;
  }

  setGameMethodType(i, type1) {
    console.log('in setGameMethodType', type1, ' i ', i);
    const ctrl: FormGroup = (<any>this.weekForm).controls.gameMethod;
    ctrl.controls[i].patchValue({type: type1});
    ctrl.controls[i].get('type').markAsTouched();
  }

  onSubmit() { console.log('in submit'); }

  ngOnDestroy() {
    this.subscriptionR.unsubscribe();
  }

}
