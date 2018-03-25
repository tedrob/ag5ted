import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './player.component';
import { PlayerStartComponent } from './player-start/player-start.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';

const playersRoutes: Routes = [
    { path: 'player', component: PlayerComponent, children: [
        { path: '', component: PlayerStartComponent },
        { path: 'new', component: PlayerEditComponent },
        { path: ':id', component: PlayerDetailComponent },
        { path: ':id/edit', component: PlayerEditComponent }
    ]},
];

@NgModule({
    imports: [
        RouterModule.forChild(playersRoutes)
    ],
    exports: [RouterModule]
})
export class PlayersRoutingModule {}
