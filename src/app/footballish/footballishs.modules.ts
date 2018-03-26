import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { FootballishComponent } from './footballish.component';
import { FootballStartComponent } from './football-start/football-start.component';
import { FootballListComponent } from './football-list/football-list.component';
import { FootballListNfcComponent } from './football-list-nfc/football-list-nfc.component';
import { FootballListAfcComponent } from './football-list-afc/football-list-afc.component';
import { NfcItemComponent } from './football-list-nfc/nfc-item/nfc-item.component';
import { AfcItemComponent } from './football-list-afc/afc-item/afc-item.component';
import { FootballScheduleComponent } from './football-schedule/football-schedule.component';
import { FootballShowscheduleComponent } from './football-showschedule/football-showschedule.component';
import { ShowscheduleItemComponent } from './football-showschedule/showschedule-item/showschedule-item.component';
import { ShowscheduleDetailComponent } from './football-showschedule/showschedule-detail/showschedule-detail.component';
import { FootballishsRoutingModule } from './footballishs-routing.module';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        FootballishComponent,
        FootballStartComponent,
        FootballListComponent,
        FootballListNfcComponent,
        FootballListAfcComponent,
        NfcItemComponent,
        AfcItemComponent,
        FootballScheduleComponent,
        FootballShowscheduleComponent,
        ShowscheduleItemComponent,
        ShowscheduleDetailComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        NgbModule.forRoot(),
        FootballishsRoutingModule
    ]
})
export class FootballishsModule {}
