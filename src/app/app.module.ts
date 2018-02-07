import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PlayerComponent } from './player/player.component';
import { PlayerListComponent } from './player/player-list/player-list.component';
import { PlayerItemComponent } from './player/player-list/player-item/player-item.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';
import { BasichighlightDirective } from './basic-highlight/basic-highlight.directive';
import { BetterHighlightDirective } from './better-highlight/better-highlight.directive';
import { UnlessDirective } from './unless.directive';
import { DropdownDirective } from './shared/dropdown.directive';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayerStartComponent } from './player/player-start/player-start.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PlayerEditComponent } from './player/player-edit/player-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlayerComponent,
    PlayerListComponent,
    PlayerItemComponent,
    PlayerDetailComponent,
    BasichighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    DropdownDirective,
    PlayerStartComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    PlayerEditComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
