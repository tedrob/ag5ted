import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BasichighlightDirective } from './basic-highlight/basic-highlight.directive';
import { BetterHighlightDirective } from './better-highlight/better-highlight.directive';
import { UnlessDirective } from './unless.directive';
import { DropdownDirective } from './shared/dropdown.directive';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PlayerService } from './player/player.service';
import { FootballishComponent } from './footballish/footballish.component';
import { FootballListComponent } from './footballish/football-list/football-list.component';
import { FootballListNfcComponent } from './footballish/football-list-nfc/football-list-nfc.component';
import { FootballListAfcComponent } from './footballish/football-list-afc/football-list-afc.component';
import { FootballService } from './footballish/football.service';
import { NfcItemComponent } from './footballish/football-list-nfc/nfc-item/nfc-item.component';
import { AfcItemComponent } from './footballish/football-list-afc/afc-item/afc-item.component';
import { FootballStartComponent } from './footballish/football-start/football-start.component';
import { FootballScheduleComponent } from './footballish/football-schedule/football-schedule.component';
import { HttpClient } from 'selenium-webdriver/http';
import { FootballShowscheduleComponent } from './footballish/football-showschedule/football-showschedule.component';
import { ShowscheduleItemComponent } from './footballish/football-showschedule/showschedule-item/showschedule-item.component';
import { ShowscheduleDetailComponent } from './footballish/football-showschedule/showschedule-detail/showschedule-detail.component';
import {PlayersModules } from './player/players.modules';
import { SomethingelsesMudule } from './somethingelse/somthingelses.modules';
import { WhatifsModule } from './whatif/whatifs.modules';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BasichighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    DropdownDirective,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    FootballishComponent,
    FootballListComponent,
    FootballListNfcComponent,
    FootballListAfcComponent,
    NfcItemComponent,
    AfcItemComponent,
    FootballStartComponent,
    FootballScheduleComponent,
    FootballShowscheduleComponent,
    ShowscheduleItemComponent,
    ShowscheduleDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,

    NgbModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    PlayersModules,
    SomethingelsesMudule,
    WhatifsModule,
  ],
  providers: [PlayerService, FootballService],
  bootstrap: [AppComponent]
})
export class AppModule { }
