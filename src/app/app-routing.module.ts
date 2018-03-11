import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';

import { PlayerComponent } from './player/player.component';
import { PlayerStartComponent } from './player/player-start/player-start.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PlayerEditComponent } from './player/player-edit/player-edit.component';
import { FootballishComponent } from './footballish/footballish.component';
import { FootballStartComponent } from './footballish/football-start/football-start.component';
import { FootballScheduleComponent } from './footballish/football-schedule/football-schedule.component';
import { FootballShowscheduleComponent } from './footballish/football-showschedule/football-showschedule.component';
import { ShowscheduleDetailComponent } from './footballish/football-showschedule/showschedule-detail/showschedule-detail.component';
import { WhatifComponent } from './whatif/whatif.component';
import { ScheduleComponent } from './whatif/schedule/schedule.component';
import { PickteamsComponent } from './whatif/pickteams/pickteams.component';
import { ManageteamsComponent } from './whatif/manageteams/manageteams.component';
import { ShowgamespickedComponent } from './whatif/pickteams/showgamespicked/showgamespicked.component';
import { SomethingelseComponent } from './somethingelse/somethingelse.component';
import { FibonacciComponent } from './somethingelse/fibonacci/fibonacci.component';
import { SimpleinterestComponent } from './somethingelse/simpleinterest/simpleinterest.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: '', redirectTo: './', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'player', component: PlayerComponent, children: [
        { path: '', component: PlayerStartComponent },
        { path: 'new', component: PlayerEditComponent },
        { path: ':id', component: PlayerDetailComponent },
        { path: ':id/edit', component: PlayerEditComponent }
    ]},
    { path: 'footballish', component: FootballishComponent, children: [
        { path: '', component: FootballStartComponent },
        { path: 'schedule', component: FootballScheduleComponent },
        { path: 'showschedule', component: FootballShowscheduleComponent },
        { path: 'showschedule/:id', component: ShowscheduleDetailComponent}
    ]},
    { path: 'whatif', component: WhatifComponent, children: [
        { path: 'manageteams', component: ManageteamsComponent, pathMatch: 'full'},
        { path: 'schedule', component: ScheduleComponent, pathMatch: 'full'},
        { path: 'pickteams', component: PickteamsComponent, pathMatch: 'full'},
        { path: 'showgames', component: ShowgamespickedComponent, pathMatch: 'full'},
    ]},
    { path: 'somethingelse', component: SomethingelseComponent, children: [
        { path: 'fibnocci', component: FibonacciComponent, pathMatch: 'full'},
        { path: 'simpleinterest', component: SimpleinterestComponent, pathMatch: 'full'},
    ]},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
