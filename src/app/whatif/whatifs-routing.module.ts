import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WhatifComponent } from './whatif.component';
import { ManageteamsComponent } from './manageteams/manageteams.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PickteamsComponent } from './pickteams/pickteams.component';
import { ShowgamespickedComponent } from './pickteams/showgamespicked/showgamespicked.component';

const whatifsRoutes: Routes = [
    { path: '', component: WhatifComponent, children: [
        { path: 'manageteams', component: ManageteamsComponent, pathMatch: 'full'},
        { path: 'schedule', component: ScheduleComponent, pathMatch: 'full'},
        { path: 'pickteams', component: PickteamsComponent, pathMatch: 'full'},
        { path: 'showgames', component: ShowgamespickedComponent, pathMatch: 'full'}
    ]},
];

@NgModule({
    imports: [
        RouterModule.forChild(whatifsRoutes)
    ],
    exports: [RouterModule]
})
export class WhatifsRoutingModule {}
