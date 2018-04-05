import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SomethingelseComponent } from './somethingelse.component';
import { FibonacciComponent } from './fibonacci/fibonacci.component';
import { SimpleinterestComponent } from './simpleinterest/simpleinterest.component';
import { PalindromeComponent } from './palindrome/palindrome.component';
import { GamespartComponent } from './gamespart/gamespart.component';

const somethingelsesRoutes: Routes = [
    { path: '', component: SomethingelseComponent, children: [
        { path: 'fibnocci', component: FibonacciComponent, pathMatch: 'full'},
        { path: 'simpleinterest', component: SimpleinterestComponent, pathMatch: 'full'},
        { path: 'palindrome', component: PalindromeComponent, pathMatch: 'full'},
        { path: 'gamespart', component: GamespartComponent, pathMatch: 'full'},
    ]},

];

@NgModule({
    imports: [
        RouterModule.forChild(somethingelsesRoutes)
    ],
    exports: [RouterModule]
})
export class SomethingelsesRoutingModule {}
