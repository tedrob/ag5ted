import { Component, OnInit } from '@angular/core';
import { Player } from './players.model';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [PlayerService]
})
export class PlayerComponent implements OnInit {
  selectedPlayer: Player;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.playerSelected
      .subscribe(
        (player: Player) => {
          this.selectedPlayer = player;
        }
      );
  }

}
