import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PlayerComponent } from './player/player.component';
import { PlayerListComponent } from './player/player-list/player-list.component';
import { PlayerItemComponent } from './player/player-list/player-item/player-item.component';
import { PlayerEditComponent } from './player/player-list/player-edit/player-edit.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { BasichighlightDirective } from './basic-highlight/basic-highlight.directive';
import { BetterHighlightDirective } from './better-highlight/better-highlight.directive';
import { UnlessDirective } from './unless.directive';
import { DropdownDirective } from './shared/dropdown.directive';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayerStartComponent } from './player/player-start/player-start.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlayerComponent,
    PlayerListComponent,
    PlayerItemComponent,
    PlayerEditComponent,
    PlayerDetailComponent,
    BasichighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    DropdownDirective,
    PlayerStartComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    YoutubePlayerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
