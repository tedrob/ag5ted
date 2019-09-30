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
  fibobacciResults: string;
  // cache: any = {};
  lnbreak = 8;
  recursivS: number[] = [];


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.fiboForm = new FormGroup({
      fiboNum: new FormControl(null, [Validators.required]),
      method: new FormControl('sequence'),
      fiboRresults: new FormControl(null)
    });
    this.fiboForm.patchValue({
      'fiboNum': 10
    });
  }

  onSubmit() {
    this.submitted = false;
    this.fibobacciResults = '';
    let num: number = this.fiboForm.controls.fiboNum.value;
    if (this.fiboForm.controls.method.value === 'sequence') {
      this.fibobacciResults = this.fibonacci(num);
    } else {
      num++;
      this.recursivS = this.fib_s(num);
      for (let index = 0; index < this.recursivS.length; index++) {
        if (index > this.lnbreak) {
          this.fibobacciResults += this.recursivS[index] + '\n ';
          this.lnbreak += index;
        } else {
          this.fibobacciResults += this.recursivS[index] + ', ';
          this.lnbreak++;
        }
      }
      this.fibobacciResults = this.fibobacciResults.substr(0, this.fibobacciResults.length - 2);
    }

    this.submitted = true;
  }

  fibonacci(count: number) {
    let first = 0;
    let second = 1;
    let sum = 0;
    let fibSeqStr = first.toString() + ', ' + second.toString() + ', ';

    for (let index = 0; index < count; index++) {
      sum = first + second;
      first = second;
      second = sum;
      if (index > this.lnbreak) {
        fibSeqStr += sum.toString() + '\n ';
        this.lnbreak += 8;
      } else {
        fibSeqStr += sum.toString() + ', ';
      }
    }
    fibSeqStr = fibSeqStr.substr(0, fibSeqStr.length - 2);
    return fibSeqStr;
  }

  fib_s(count: number) {
    // count++;
    if (count <= 1) {
      return [0, 1];
    } else {
      const s = this.fib_s(count - 1);
      s.push((s[s.length - 1] + s[s.length - 2]));
      return s;
    }
  }

}
