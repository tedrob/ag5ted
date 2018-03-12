import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-simpleinterest',
  templateUrl: './simpleinterest.component.html',
  styleUrls: ['./simpleinterest.component.css']
})
export class SimpleinterestComponent implements OnInit, AfterViewInit {
  interestForm: FormGroup;
  submitted = false;
  @ViewChild('myCanvas') myCanvas: ElementRef;
  context: CanvasRenderingContext2D;
  graph = document.getElementById('graph');

  constructor() { }

  ngOnInit() {
    this.interestForm = new FormGroup({
      'amount': new FormControl('', [Validators.required]),
      'apr': new FormControl(),
      'years': new  FormControl(),
      'payment': new FormControl(),
      'total': new FormControl(),
      'totalinterest': new FormControl()
      // 'graph': new FormControl()
    });
    this.interestForm.patchValue({
      'payment': '',
      'total': '',
      'totalinterest': ''
    });

  }

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
  }

  calculate() {
    let monthly = Infinity;
    if (this.interestForm.controls.amount.value === null) {
       return;
    } else if (this.interestForm.controls.apr.value === null) {
      return;
    } else if (this.interestForm.controls.years.value === null) {
      return;
    }
    console.log('calculate');
    // this.context.clearRect(0, 0, 400, 250);

    // look up the input and output elements in the document
    const amount = this.interestForm.controls.amount.value;
    const apr = this.interestForm.controls.apr.value;
    const years = this.interestForm.controls.years.value;
    let payment  = this.interestForm.controls.payment.value;
    let total = this.interestForm.value.total.value;

    let totalinterest = this.interestForm.value.totalinterest.value;

    // Get the user's input from the input elements.
    // Convert interest from a percentage to a decimal, and convert from
    // an annual rate to a monthly rate. Convert payment period in years
    // to the number of monthly payments.
     const principal = parseFloat(amount);
     const interest = parseFloat(apr) / 100 / 12;
     const payments = parseFloat(years) * 12;

    // comput the montly payment figure
    const x = Math.pow((1 + interest), payments); // Math.pow compute powers
    monthly = (principal * x * interest) / ( x - 1 );
    // console.log('what', x, monthly);

    // if the result is finite number, the user's input was good and
    // we have meaningful results to display
    // console.log('finit', monthly, isFinite(monthly), ' --nope');
    if (isFinite(monthly)) { // (Infinity === monthly) {
      // Fill in the output fields, rouding to 2 decimal places
      monthly.toFixed(2);
      payment = monthly.toFixed(2);
      total = (monthly * payments).toFixed(2);
      totalinterest = ((monthly * payments) - principal).toFixed(2);
      this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
      this.chart(principal, interest, monthly, payments);
    }
    this.interestForm.patchValue({
      'payment': monthly.toFixed(2),
      'total': (monthly * payments).toFixed(2),
      'totalinterest': ((monthly * payments) - principal).toFixed(2)
    });
    this.submitted = true;
  }

  // Chart monthly loan balance, interest and equity in an <canvas> element.
  // if called with no arguments then just erase any previous drawn elemnt.
   chart(principal, interest, monthly, payments) {
    this.context.restore();
    const g = this.context;
    g.textAlign = 'left';
    // let graph: HTMLElem200ent;
     this.graph = document.getElementById('graph');

     const width = this.graph.clientWidth; // this.myCanvas.nativeElement.width;
     const height = this.graph.clientHeight; // this.myCanvas.nativeElement.height;

     g.clearRect(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
     g.fillStyle = '#ff4000';
     g.fillRect(0, 0, width, height);
     g.globalCompositeOperation = 'distnation-out';

    // get the "context" object for the <canvas>
    // that defines with the drawing API
    // get canvas size
    // these functions conver payment numbers and dollars amounts to pixels
    function paymentToX(n) { return n * width / payments; }
    function amountToY(a) { return height - (a * height / (monthly * payments * 1.05)); }

    // Payments are a straight line from (0,0) to (payments, monthly*payments)
    g.moveTo(paymentToX(0), amountToY(0));
    g.lineTo(paymentToX(payments), // draw to upper right)
    amountToY(monthly * payments));

    g.lineTo(paymentToX(payments), amountToY(0));
    g.closePath(); // And back to start
    g.globalAlpha = 0.95;
    // g.font = 'serif';
    g.fillStyle = '#FFFF00'; // '#f88'; // light red
    g.fill(); // Fill the triangle
    g.font = 'bold 12px sans-serif'; // Define a font
    {
      g.fillText('Total Interest Payments', 20, 20); // Draw text in legend
    }
    // Cumulative equity is non-linear and trickier to chart
    let equity = 0;
    g.beginPath(); // Begin a new shape
    g.moveTo(paymentToX(0), amountToY(0)); // starting at lower-left
    for (let p = 1; p <= payments; p++) {
      const thisMonthsinterest = (principal - equity) * interest;
      equity += (monthly - thisMonthsinterest); // The rest goes to equity
      g.lineTo(paymentToX(p), amountToY(equity)); // Draw line to this point
    }
    g.lineTo(paymentToX(payments), amountToY(0)); // Line back to X axis
    g.closePath(); // And back to start point
    g.globalAlpha = 0.95;
    g.fillStyle = 'green'; // Now use green paint
    g.fill(); // And fill area under curve
    // if (!this.submitted)
    {
      g.fillText('Total Equity', 20, 35); // Label it in green
    }
    // Loop again, as above, but chart loan balance as a thick black line
    let bal = principal;
    g.beginPath();
    g.moveTo(paymentToX(0), amountToY(bal));
    for (let p = 1; p <= payments; p++) {
      const thisMonthsInterest = bal * interest;
      bal -= (monthly - thisMonthsInterest); // The rest goes to equity
      g.lineTo(paymentToX(p), amountToY(bal)); // Draw line to this point
    }
    g.lineWidth = 3; // Use a thick line
    g.stroke(); // Draw the balance curve
    g.closePath();
    g.fillStyle = 'black'; // Switch to black text
    // if (!this.submitted)
    {
      g.fillText('Loan Balance', 20, 50); // Legend entry
    }
    // Now make yearly tick marks and year numbers on X axis
    g.textAlign = 'center'; // Center text over ticks
    let y = amountToY(0); // Y coordinate of X axis
    for (let year = 1; year * 12 <= payments; year++) { // For each year
      const x = paymentToX(year * 12); // Compute tick position
      g.fillRect(x - 0.5, y - 3, 1, 3); // Draw the tick
      if (year === 1) { g.fillText('Year', x, y - 5); } // Label the axis
      if (year % 5 === 0 && year * 12 !== payments) { // Number every 5 years
        g.fillText(String(year), x, y - 5);
      }
    }
    // Mark payment amounts along the right edge
    g.textAlign = 'right'; // Right-justify text
    g.textBaseline = 'middle'; // Center it vertically
    const ticks = [monthly * payments, principal]; // The two points we'll mark
    const rightEdge = paymentToX(payments); // X coordinate of Y axis
    for (let i = 0; i < ticks.length; i++) { // For each of the 2 points
      y = amountToY(ticks[i]); // Compute Y position of tick
      g.fillRect(rightEdge - 3, y - 0.5, 3, 1); // Draw the tick mark
      g.fillText(String(ticks[i].toFixed(0)), // And label it.
      rightEdge - 5, y);
    }
    g.beginPath();
  }
}
