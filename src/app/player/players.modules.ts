import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { PlayerComponent } from './player.component';
import { PlayerStartComponent } from './player-start/player-start.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerItemComponent } from './player-list/player-item/player-item.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayersRoutingModule } from './players-routing.module';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        PlayerComponent,
        PlayerStartComponent,
        PlayerListComponent,
        PlayerItemComponent,
        PlayerEditComponent,
        PlayerDetailComponent
    ],
    imports: [
        CommonModule,
        PlayersRoutingModule,
        SharedModule,
        NgbModule.forRoot(),
    ]
})
export class PlayersModules {}
