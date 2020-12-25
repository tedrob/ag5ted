import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Player } from './players.model';

@Injectable()
export class PlayerService {
    playerChanged = new Subject<Player[]>();

    private playerlists: Player[] = [
      new Player('YaxGNQE5ZLA', 'Star-Spangled Banner As Never Heard I'),
      new Player('LgPpowVNEfE', 'Musiq - So beautiful'),
      new Player('450p7goxZqg', 'John legend - All of me'),
      new Player('iXvy8ZeCs5M', 'John legend - Tonight'),
      new Player('NmCFY1oYDeM', 'John legend - Love Me Now'),
      new Player('6YNZlXfW6Ho', 'Ella mai - Boo`d up'),
      new Player('g5Z904AccvM', 'I bring me'),
      new Player('ttALzuU-JHw', 'If I ever fall in love'),
      new Player('H64QG4UsrGI', 'Mario - let me Love You'),
      new Player('PMivT7MJ41M', 'That`s What I Like-Bruno Mars'),
      new Player('oOfGGjr6Aq4', 'Kem - Share My Life'),
      new Player('62iOcrKHG6Q', 'River - Leon Bridges'),
      new Player('fV8vB1BB2qc', 'Boyz II Men - I`ll Make Love To You'),
      new Player('HhuGQUZJot8', 'Alicia Keys - Un-thinkable'),
      new Player('2aK-ciz7mGI', 'Alicia Keys & Jay-Z - New York'),
      new Player('XxGh4ruG33M', 'Fourplay-I`ll Still Be Loving You'),
      new Player('jT0gbcq5xqI', 'You and I ft. KeKe Wyatt'),
      new Player('seZMOTGCDag', 'Jack Johnson - Better Togeher'),
      new Player('xpVfcZ0ZcFM', 'Drake - God`s Plan'),
      new Player('3NKeffFYWno', 'Jhene Aiko - Unreleased'),
      new Player('EtJy69cEOtQ', 'How to Learn Anything'),
      new Player('BxY_eJLBflk', 'Put God First - Denzel Washington'),
      new Player('g-jwWYX7Jlo', 'Dream Motivational'),
      new Player('TqyLnMa3DJw', 'CHOPIN - Nocture Op.9'),
      new Player('zM4En012IJo', 'Novel & Short Story'),
      new Player('HCjNJDNzw8Y', 'HAVANA, Camila Cabello'),
      new Player('Qn25lL4a94o', 'Dr. SaxLove, Max Maxwell'),
      new Player('gSuQggW_iJA', 'Southern Blues Juke Joint Soul Jams'),
      new Player('lFsChbwsbmo', 'Insanity Gregory Porter'),
      new Player('p37iZ3o5k2Y', 'GIL Scott Heron'),
      new Player('5oSnLt20Wn4', 'Consequence of Love'),
      new Player('QUmxh7H8vok', 'Anthony Hamilton - Charlene'),
      new Player('kXIX5vHYjiM', 'Funky Uplifting'),
      new Player('coue17TmnrA', 'Funky Uplifting R&B Mix'),
      new Player('hifl-h1FXek', 'Teddy Love TKO'),
      new Player('SGqg_ZzThDU', 'Black Coffee Salle'),
      new Player('m_qewI-1cEs', 'Honey Dijon Boiler Room'),
      new Player('8WYHDfJDPDc', 'NellyVille'),
      new Player('J7HwVIGWBls', 'Backyard Southern Soul'),
      new Player('ICXNWceWRB0', 'Man in the Mirror'),
      new Player('HhSB53Nhj_8', 'Lila Where I"m Coming From'),
      new Player('1km-F2DVgjs', 'Moms Mabley'),
      new Player('QFUif6T5xiI', 'Witney Houston'),
      new Player('lOqSQgHUWW4', 'Trevor Noah'),
      new Player('aOrmjpToyMk', 'Smooth Jazz'),
      new Player('D0mgk0KgI0Q', 'Silent Night - Temptations'),
      new Player('79UWvR734wI', 'InfoOnDif-MVC-Net-Core'),
      new Player('fyGSyqEX2dw', 'Don"t imitate me JavaScript'),
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
