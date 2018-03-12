import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-palindrome',
  templateUrl: './palindrome.component.html',
  styleUrls: ['./palindrome.component.css']
})
export class PalindromeComponent implements OnInit {
  palindromeForm: FormGroup;
  submitted = false;

  constructor() { }

  ngOnInit() {
    this.palindromeForm = new FormGroup({
      'inputnum': new FormControl(null, [Validators.required]),
      'reversenum': new FormControl(''),
      'palindrom': new FormControl(null),
    });

    this.palindromeForm.patchValue({
      'inputnum': 16461,
    });
  }

  generateResults() {
    if (this.submitted === true) {
      this.submitted = false;
      this.palindromeForm.patchValue({
        'palindrom': '',
      });
      return;
    }

    let num: number;
    let sum = 0;
    num = +this.palindromeForm.controls.inputnum.value;
    let temp = +num;

    do {
      sum = sum * 10;
      sum = sum + temp % 10;
      temp = Math.floor(temp / 10);
    }
    while (temp !== 0);
    this.palindromeForm.patchValue({
      'reversenum': sum,
    });

    if (sum === num) {
      this.palindromeForm.patchValue({
        'palindrom': 'Number is a Palindrome',
      });
    } else {
      this.palindromeForm.patchValue({
        'palindrom': 'Number is not a  Palindrome',
      });
    }
    this.submitted = true;
  }
}
