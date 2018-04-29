import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FootballishComponent } from './footballish.component';
import { FootballStartComponent } from './football-start/football-start.component';
import { FootballScheduleComponent } from './football-schedule/football-schedule.component';
import { FootballShowscheduleComponent } from './football-showschedule/football-showschedule.component';
import { ShowscheduleDetailComponent } from './football-showschedule/showschedule-detail/showschedule-detail.component';
import { FootballActualComponent } from './football-actual/football-actual.component';
import { FootballPicksComponent } from './football-picks/football-picks.component';
import { PicksStartComponent } from './football-picks/picks-start/picks-start.component';
import { PicksDetailComponent } from './football-picks/picks-detail/picks-detail.component';

const footballishsRoutes: Routes = [
    { path: '', component: FootballishComponent, children: [
        { path: '', component: FootballStartComponent },
        { path: 'schedule', component: FootballScheduleComponent },
        { path: 'showschedule/:id', component: ShowscheduleDetailComponent},

        { path: 'pickteams', component: FootballPicksComponent, children: [
            { path: '', component: PicksStartComponent },
            { path: ':id', component: PicksDetailComponent}
        ]},
        { path: 'actualschedule', component: FootballActualComponent},
        { path: 'showschedule', component: FootballShowscheduleComponent },
        // { path: 'showschedule/:id', component: ShowscheduleDetailComponent}
        // { path: 'actualschedule', component: FootballActualComponent}
    ]},
];

@NgModule({
    imports: [
        RouterModule.forChild(footballishsRoutes)
    ],
    exports: [RouterModule]
})
export class FootballishsRoutingModule {}
