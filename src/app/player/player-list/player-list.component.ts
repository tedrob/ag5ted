import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Player } from '../players.model';
import { PlayerListProvider } from './player-listprovider';
import { PlayerService } from '../player.service';


@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit, OnDestroy {
  playerlists: Player[];
  subscription: Subscription;

  constructor(private playerService: PlayerService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.playerService.playerChanged
      .subscribe(
        (players: Player[]) => {
          this.playerlists = players;
        }
      );
    this.playerlists = this.playerService.getPlayers();
  }

  onNewplayer() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
