import { Component, OnInit, Input } from '@angular/core';

import { Player } from '../../players.model';
import { PlayerService } from '../../player.service';

@Component({
  selector: 'app-player-item',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.css']
})
export class PlayerItemComponent implements OnInit {
  @Input() player: Player;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
  }

  onSelected() {
    this.playerService.playerSelected.emit(this.player);
  }

}
