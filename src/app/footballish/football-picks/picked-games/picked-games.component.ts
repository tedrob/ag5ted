import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { FootballService } from './../../football.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-picked-games',
  templateUrl: './picked-games.component.html',
  styleUrls: ['./picked-games.component.css']
})
export class PickedGamesComponent implements OnInit {
  gameForm: FormGroup;
  arrayForm = this.fb.array([]);
  gmsPickedForm;
  week: any;

  constructor(private fb: FormBuilder,
              private fs: FootballService,
              private route: ActivatedRoute,
              private router: Router) {
    this.gmsPickedForm = this.fs.getArrayFromGames();
  }

  ngOnInit() {
    // return on error (length === 0)
    if (this.gmsPickedForm['controls'].length === 0) {
      this.router.navigate(['../../../footballish'], {relativeTo: this.route});
      // console.log('in length = 0');
    } else {
      this.week = this.gmsPickedForm['controls'][0].controls[0]['controls'].week.value;
      // console.log('Init week', this.week, ' length ', this.gmsPickedForm['controls'][0].controls);
      this.gmsPickedForm['controls'][0].controls.forEach(gm => {
        const group = this.initModelFormGroup();
        group.patchValue({
          'game': gm['controls'].game.value,
          'type': gm['controls'].type.value,
          'teamNo': gm['controls'].teamNo.value,
          'teamName': gm['controls'].teamName.value,
          'teamShortNm': gm['controls'].teamShortNm.value,
        });
        this.arrayForm.push(group);
      });
      this.gameForm = this.fb.group({
        arrayGame: this.arrayForm
      });
      this.week = this.fs.getCurWeekplayed();
      // console.log('after getting week ', this.week);
    }
  }

  initModelFormGroup () {
    const model = this.fb.group({
      'game': new FormControl(null), // game of week
      'type': new FormControl(null), // home or away
      'teamNo': new FormControl(null),
      'teamName': new FormControl(null),
      'teamShortNm': new FormControl  // teams short name
    });
    return model;
  }

  get arrayGame(): FormArray {
    return this.arrayGame.get('arrayGame') as FormArray;
  }

}
