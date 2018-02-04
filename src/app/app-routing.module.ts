import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';

import { PlayerComponent } from './player/player.component';
import { PlayerStartComponent } from './player/player-start/player-start.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/player', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'player', component: PlayerComponent, children: [
        { path: '', component: PlayerStartComponent },
        { path: ':id', component: PlayerDetailComponent }
    ] }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
