import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Player } from '../players.model';
import { SafeResourceUrl, DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PlayerService } from '../player.service';
import { Options } from 'selenium-webdriver/firefox';
// import { YT } from 'ngx-youtube-player/src/services/youtube-player.service';

import { YoutubePlayerModule } from 'ngx-youtube-player';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  @Input() player: Player;
  @Output() change = new EventEmitter<YT.Player>();
  id: number;
  // ----
  ik_player;
  // ----

  playerlists: Player[];
  playerlist = [];

  constructor(private sanitizer: DomSanitizer,
              private playerService: PlayerService,
              private route: ActivatedRoute) {
    console.log('in contructor ');
   }

  ngOnInit() {
    const id = this.route.params
                .subscribe(
                  (params: Params) => {
                    this.id = params['id'];
                    this.player = this.playerService.getplayer(this.id);
                  }
                );

    this.playerlists = this.playerService.getPlayers();
    for (let i = 0; i < this.playerlists.length; i++) {
      const names = this.playerlists[i].name;
      this.playerlist.push(names);
    }
  }

  getEmbedURL(item) {

    let z;
    const playerlist = [];
    for ( let i = 0; i < this.playerlists.length; i++) {
      if (this.playerlists[i].name === item.name) {
        z = i + 1;
        break;
      }
    }

    for (let i = z; i < this.playerlists.length; i++) {
      const names2 = this.playerlists[i].name;
      playerlist.push(names2);
    }

    for (let i = 0; i < z ; i++) {
      const names2 = this.playerlists[i].name;
      playerlist.push(names2);
    }
    console.log(' playerlist ' +  playerlist );

    const lnk2 = item.name + '?rel=0?version=3&amp;autoplay=1&amp;controls=1&loop=1&playlist=' + playerlist;
    // const lnk2 = item.name + '?rel=0?version=3&amp;autoplay=1&enablejsapi=true&amp;controls=1&loop=1&playlist=' + playerlist;
    const URL3 = 'https://www.youtube.com/embed/' + lnk2;

   /*  if (typeof(YoutubePlayerModule) === 'undefined') {
      console.log('undefined');
    } else {
      console.log(YoutubePlayerModule);
      // this.ik_player = new YT('player_iframe', { videoId: this.ik_player, events: {'onStateChange': this.onStateChange } });
    } */
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL3);
  }

  onStateChange(event) {
    console.log('playerchange');
  }

  /* onStateChange(player) {
    this.change.emit();
    if (player.data === 0) {
      this.savePlayer(player.name);
    }
    console.log('player state', player.data);
  } */

}
