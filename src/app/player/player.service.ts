import { EventEmitter } from '@angular/core';

import { Player } from './players.model';

export class PlayerService {
    // playerSelected = new EventEmitter<Player>();

    private playerlists: Player[] = [
        new Player('LgPpowVNEfE', 'Musiq - So beautiful'),
        new Player('450p7goxZqg', 'All of me'),
        new Player('g5Z904AccvM', 'I bring me'),
        new Player('PMivT7MJ41M', 'That`s What I Like'),
        new Player('oOfGGjr6Aq4', 'Share My Life'),
        new Player('62iOcrKHG6Q', 'River'),
        new Player('XxGh4ruG33M', 'FourPlay')
      ];

      getPlayers() {
          return this.playerlists.slice();
      }

      getplayer(index: number) {
          return this.playerlists[index];
      }
}
