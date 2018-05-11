import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Player } from './players.model';

@Injectable()
export class PlayerService {
    playerChanged = new Subject<Player[]>();

    private playerlists: Player[] = [
        new Player('LgPpowVNEfE', 'Musiq - So beautiful'),
        new Player('450p7goxZqg', 'All of me'),
        new Player('6YNZlXfW6Ho', 'Ella mai - Boo`d up'),
        new Player('g5Z904AccvM', 'I bring me'),
        new Player('H64QG4UsrGI', 'Mario - let me Love You'),
        new Player('PMivT7MJ41M', 'That`s What I Like'),
        new Player('oOfGGjr6Aq4', 'Share My Life'),
        new Player('62iOcrKHG6Q', 'River'),
        new Player('HhuGQUZJot8', 'Alicia Keys - Un-thinkable'),
        new Player('XxGh4ruG33M', 'Fourplay-I`ll Still Be Loving You'),
        new Player('jT0gbcq5xqI', 'You and I ft. KeKe Wyatt'),
        new Player('seZMOTGCDag', 'Jack Johnson - Better Togeher'),
        new Player('xpVfcZ0ZcFM', 'Drake - God`s Plan'),
        new Player('EtJy69cEOtQ', 'How to Learn Anything'),
        new Player('BxY_eJLBflk', 'Put God First - Denzel Washington'),
        // new Player('3B87LMXvUsM', 'Black Panther'), lFsChbwsbmo 'Insanity Gregory Porter", 5oSnLt20Wn4 'Consequence of Love'
        new Player('TqyLnMa3DJw', 'CHOPIN - Nocture Op.9'),
        new Player('arMu4f8rnBk', 'Beethoven- Moonlight Sonata'),
        new Player('o1dBg__wsuo', 'Mendelssohn Violin Concerto E Minor'),
        new Player('zM4En012IJo', 'Novel & Short Story'),
        new Player('HCjNJDNzw8Y', 'HAVANA, Camila Cabello'),
        new Player('Qn25lL4a94o', 'Dr. SaxLove, Max Maxwell'),
        new Player('lFsChbwsbmo', 'Insanity Gregory Porter'),
        new Player('5oSnLt20Wn4', 'Consequence of Love'), //
        new Player('n2v98PGBZH4', 'Billy Paul-Me And Mrs.Jones'),
        // new Player('_8o71Hlzonk', 'Stay With Me, Sam Smith'),
        new Player('QUmxh7H8vok', 'Anthony Hamilton - Charlene')
        // new Player('sJ5ZsOBjaZQ', 'Keke Wyatt-My First Love')
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
