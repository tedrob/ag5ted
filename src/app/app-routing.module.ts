import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';

import { FootballishComponent } from './footballish/footballish.component';
import { FootballStartComponent } from './footballish/football-start/football-start.component';
import { FootballScheduleComponent } from './footballish/football-schedule/football-schedule.component';
import { FootballShowscheduleComponent } from './footballish/football-showschedule/football-showschedule.component';
import { ShowscheduleDetailComponent } from './footballish/football-showschedule/showschedule-detail/showschedule-detail.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: '', redirectTo: './', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'footballish', component: FootballishComponent, children: [
        { path: '', component: FootballStartComponent },
        { path: 'schedule', component: FootballScheduleComponent },
        { path: 'showschedule', component: FootballShowscheduleComponent },
        { path: 'showschedule/:id', component: ShowscheduleDetailComponent},
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
