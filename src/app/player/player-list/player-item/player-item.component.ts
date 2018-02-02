import { Component, OnInit, Input } from '@angular/core';

import { Player } from '../../players.model';

@Component({
  selector: 'app-player-item',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.css']
})
export class PlayerItemComponent implements OnInit {
  @Input() player: Player;
  @Input() index: number;

  ngOnInit() {}
 }
