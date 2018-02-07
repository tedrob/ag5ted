import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';

import { PlayerComponent } from './player/player.component';
import { PlayerStartComponent } from './player/player-start/player-start.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PlayerEditComponent } from './player/player-edit/player-edit.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/player', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'player', component: PlayerComponent, children: [
        { path: '', component: PlayerStartComponent },
        { path: 'new', component: PlayerEditComponent },
        { path: ':id', component: PlayerDetailComponent },
        { path: ':id/edit', component: PlayerEditComponent }
    ] }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
