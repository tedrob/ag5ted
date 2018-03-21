import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SomethingelseComponent } from './somethingelse.component';
import { FibonacciComponent } from './fibonacci/fibonacci.component';
import { GamespartComponent } from './gamespart/gamespart.component';
import { PalindromeComponent } from './palindrome/palindrome.component';
import { SimpleinterestComponent } from './simpleinterest/simpleinterest.component';
import { BoardComponent } from './gamespart/presentation/board/board.component';
import { CellComponent } from './gamespart/presentation/cell/cell.component';
import { SomethingelsesRoutingModule } from './somethingelses-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        SomethingelseComponent,
        FibonacciComponent,
        GamespartComponent,
        PalindromeComponent,
        SimpleinterestComponent,
        BoardComponent,
        CellComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        SomethingelsesRoutingModule
    ]
})
export class SomethingelsesMudule {}
