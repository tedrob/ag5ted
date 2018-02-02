import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../players.model';
import { PlayerListProvider } from './player-listprovider';
import { PlayerService } from '../player.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  playerlists: Player[];

  // currentPlayer: PlayerListProvider;

  constructor(private playerService: PlayerService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.playerlists = this.playerService.getPlayers();
  }
}
