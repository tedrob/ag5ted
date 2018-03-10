import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.css']
})
export class FibonacciComponent implements OnInit {
  fiboForm: FormGroup;
  submitted = false;
  fibobacciResults;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.fiboForm = new FormGroup({
      fiboNum: new FormControl(null, [Validators.required]),
      fiboRresults: new FormControl(null)
    });
    this.fiboForm.patchValue({
      'fiboNum': 10
    });
  }

  onSubmit() {
    this.submitted = false;
    this.fibobacciResults = '';
    this.fibobacciResults = this.fibonacci(this.fiboForm.controls.fiboNum.value);
    this.submitted = true;
  }

  fibonacci(count: number) {
    let first = 0;
    let second = 1;
    let sum = 0;
    let lnbreak = 8;

    let fibSeqStr = first.toString() + ', ' + second.toString() + ', ';

    for (let index = 0; index < count; index++) {
      sum = first + second;
      first = second;
      second = sum;
      if (index > lnbreak) {
        fibSeqStr += sum.toString() + '\n ';
        lnbreak += 8;
      } else {
        fibSeqStr += sum.toString() + ', ';
      }
    }
    return fibSeqStr;
  }

}
