import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: '', redirectTo: './', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'player', loadChildren: './player/players.modules#PlayersModules' },
    { path: 'footballish', loadChildren: './footballish/footballishs.modules#FootballishsModule' },
    { path: 'whatif', loadChildren: './whatif/whatifs.modules#WhatifsModule' },
    // { path: 'somethingelse', loadChildren: './somethingelse/somthingelses.modules#SomethingelsesModule' },
];                                       // ./somethingelse/somthingelses.modules

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
