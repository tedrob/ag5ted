import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FootballService } from '../../football.service';
import { FootballSchedule } from './../../football-schedule.model';
import { FormBuilder } from '@angular/forms';
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
  subscriptionR: Subscription;
  subscriptionW: Subscription;
  subscptnWks: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fbs: FootballService,
              private formBuilder: FormBuilder) {
                // console.log('in detail constructor');
              }

  ngOnInit() {
    this.subscriptionR = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.footballSch = this.fbs.getFootballSchwk(this.id);
          this.wklyGmsAH = this.fbs.getCurWksGames(); // team numbers
          this.wklyGmsAhName = this.fbs.curWksGmsAHNames; // .getWksGmsNames();
        }
      );
  }

  creatForm() {
    console.log('Creating form', this.wklyGmsAH);
              const newWGah: WeeklyGamesAH[] = [];
    console.log('gm');
    console.log('games', this.wklyGmsAH);
  }

  ngOnDestroy() {
    this.subscriptionR.unsubscribe();
  }

}
