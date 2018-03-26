import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FootballishComponent } from './footballish.component';
import { FootballStartComponent } from './football-start/football-start.component';
import { FootballScheduleComponent } from './football-schedule/football-schedule.component';
import { FootballShowscheduleComponent } from './football-showschedule/football-showschedule.component';
import { ShowscheduleDetailComponent } from './football-showschedule/showschedule-detail/showschedule-detail.component';


const footballishsRoutes: Routes = [
    { path: 'footballish', component: FootballishComponent, children: [
        { path: '', component: FootballStartComponent },
        { path: 'schedule', component: FootballScheduleComponent },
        { path: 'showschedule', component: FootballShowscheduleComponent },
        { path: 'showschedule/:id', component: ShowscheduleDetailComponent},
    ]},
];

@NgModule({
    imports: [
        RouterModule.forChild(footballishsRoutes)
    ],
    exports: [RouterModule]
})
export class FootballishsRoutingModule {}
