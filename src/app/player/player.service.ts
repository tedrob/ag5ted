import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Player } from './players.model';

@Injectable()
export class PlayerService {
    playerChanged = new Subject<Player[]>();

    private playerlists: Player[] = [
    new Player('LgPpowVNEfE', 'Musiq - So beautiful'),
    new Player('450p7goxZqg', 'All of me'),
    new Player('g5Z904AccvM', 'I bring me'),
    new Player('PMivT7MJ41M', 'That`s What I Like'),
    new Player('oOfGGjr6Aq4', 'Share My Life'),
    new Player('62iOcrKHG6Q', 'River'),
    new Player('XxGh4ruG33M', 'Fourplay-I`ll Still Be Loving You'),
    new Player('jT0gbcq5xqI', 'You and I'),
    new Player('EtJy69cEOtQ', 'How to Learn Anything'),
    new Player('BxY_eJLBflk', 'Put God First - Denzel Washington'),
    // new Player('3B87LMXvUsM', 'Black Panther'),
    new Player('TqyLnMa3DJw', 'CHOPIN - Nocture Op.9'),
    new Player('arMu4f8rnBk', 'Beethoven- Moonlight Sonata'),
    new Player('o1dBg__wsuo', 'Mendelssohn Violin Concerto E Minor'),
    new Player('zM4En012IJo', 'Novel & Short Story'),
    new Player('HCjNJDNzw8Y', 'HAVANA, Camila Cabello'),
    new Player('Qn25lL4a94o', 'Dr. SaxLove, Max Maxwell'),

      ];

      getPlayers() {
          return this.playerlists.slice();
      }

      getplayer(index: number) {
          return this.playerlists[index];
      }

      addPlayer(player: Player) {
          this.playerlists.push(player);
          this.playerChanged.next(this.playerlists.slice());
      }

      updatePlayer(index: number, newPlayer: Player) {
          this.playerlists[index] = newPlayer;
          this.playerChanged.next(this.playerlists.slice());
      }

      deletePlayer(index: number) {
          this.playerlists.splice(index, 1);
          this.playerChanged.next(this.playerlists.slice());
      }
    }
