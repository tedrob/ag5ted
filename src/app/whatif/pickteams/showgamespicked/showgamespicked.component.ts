import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { FootballService } from '../../../footballish/football.service';

@Component({
  selector: 'app-showgamespicked',
  templateUrl: './showgamespicked.component.html',
  styleUrls: ['./showgamespicked.component.css']
})
export class ShowgamespickedComponent implements OnInit {
  gameForm: FormGroup;
  arrayForm = this.formBuilder.array([]);
  arrayForm1;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private fs: FootballService) {
    this.arrayForm1 = this.fs.getArrayFromGames();

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.gameForm = this.formBuilder.group({
      arrayGame: this.initGameFormArray()
    });
  }

  initGameFormArray() {
    const arrayForm2 = this.formBuilder.array([]);
    const ctrl = this.arrayForm1.controls[0] as FormArray;
    if (ctrl === undefined) {
      // console.log('this was refreshed');
      this.submitted = true;
    } else {
      for (let i = 0; i < 8; i++) {
        const group = this.initModelFormGroup();
        const wkctrl = ctrl['controls'][i].get('week').value;
        const typectrl = ctrl['controls'][i].get('type').value;
        const teamNoCtrl = ctrl['controls'][i].get('teamNo').value;
        const teamNameCtrl = ctrl['controls'][i].get('teamName').value;
        group.patchValue({
          'week': wkctrl,
          'type': typectrl,
          'teamNo': teamNoCtrl,
          'teamName': teamNameCtrl
        });
        arrayForm2.push(group);
      }
      // console.log('arr2', arrayForm2);
      return arrayForm2;
    }
  }

  initModelFormGroup () {
    const model = this.formBuilder.group({
      'week': new FormControl(null), // 0,
      'type': new FormControl(null), // '',
      'teamNo': new FormControl(null), // '',
      'teamName': new FormControl(null) // ''
    });
    return model;
  }

  get arrayGame(): FormArray {
    // console.log('get', this.arrayGame.get('arrayGame') as FormArray);
    return this.arrayGame.get('arrayGame') as FormArray;
  }

}
