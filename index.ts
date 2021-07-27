// Build a Mortgage Claculator using Rxjs and calculateMortgage method
import { calculateMortgage } from "./calculate";
import { combineLatest, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

const loanAmount = <HTMLInputElement>document.getElementById('loanAmount');
const loanInterest = <HTMLInputElement>document.getElementById('loanInterest');
const loanLength = <HTMLSelectElement>document.getElementById('loanLength');
const result = <HTMLElement>document.getElementById('result');

const amount$ = fromEvent(loanAmount, 'input').pipe(
  map((event) => parseFloat((<HTMLInputElement>event.target).value))
);
const interest$ = fromEvent(loanInterest, 'input').pipe(
  map((event) => parseFloat((<HTMLInputElement>event.target).value))
);
const period$ = fromEvent(loanLength, 'change').pipe(
  map((event) => parseFloat((<HTMLOptionElement>event.target).value))
);

combineLatest([interest$, amount$, period$]).pipe(
  map(([loanInterest, loanAmount, loanLength]) => {
    return calculateMortgage(loanInterest, loanAmount, loanLength);
  })
).subscribe(mortageAmount => {
  result.innerHTML = `Your expected monthly payment is: <b>${mortageAmount}$</b>`;
});