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
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PlayerService } from './player/player.service';
import { FootballService } from './footballish/football.service';
import { HttpClient } from 'selenium-webdriver/http';
// import { PlayersModules } from './player/players.modules';
import { SomethingelsesMudule } from './somethingelse/somthingelses.modules';
// import { WhatifsModule } from './whatif/whatifs.modules';
// import { FootballishsModule } from './footballish/footballishs.modules';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BasichighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    // PlayersModules,
    // FootballishsModule,
    SomethingelsesMudule,
    // WhatifsModule,
  ],
  providers: [PlayerService, FootballService],
  bootstrap: [AppComponent]
})
export class AppModule { }
