import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatifComponent } from './whatif.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PickteamsComponent } from './pickteams/pickteams.component';
import { ManageteamsComponent } from './manageteams/manageteams.component';
import { TeamItemComponent } from './manageteams/team-item/team-item.component';
import { TickerDirective } from '../ticker.directive';
import { ShowgamespickedComponent } from './pickteams/showgamespicked/showgamespicked.component';
import { WhatifsRoutingModule } from './whatifs-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        WhatifComponent,
        ScheduleComponent,
        PickteamsComponent,
        ManageteamsComponent,
        TeamItemComponent,
        TickerDirective,
        ShowgamespickedComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        WhatifsRoutingModule
    ]

})
export class WhatifsModule {}
