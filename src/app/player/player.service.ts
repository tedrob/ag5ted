import { EventEmitter } from '@angular/core';

import { Player } from './players.model';

export class PlayerService {
    playerSelected = new EventEmitter<Player>();

    private playerlists: Player[] = [
        new Player('eOkaj6GBBIo', 'Only Love Can  Break Your Heart'),
        new Player('450p7goxZqg', 'All of me'),
        new Player('g5Z904AccvM', 'I bring me'),
        new Player('PMivT7MJ41M', 'That"s What I Like'),
        new Player('eOkaj6GBBIo', 'Share My Life')
      ];

      getPlayers() {
          return this.playerlists.slice();
      }
}
