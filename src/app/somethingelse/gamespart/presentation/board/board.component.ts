import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares = Array(9).fill(null);
  player = 'X';
  winner = null;
  turn = `Player ${this.player}'s turn`;

  constructor() { }

  ngOnInit() { }

  // getting game status
  getgameStatusMessage() {
    return this.winner ? `Player ${this.winner} has won!` : `Player ${this.player}'s turn`;
  }

  // handling game move based on click of cell
  handleMove(position) {
    if (!this.winner && !this.squares[position]) {
      this.squares[position] = this.player;
      if (this.winningMove()) {
        this.winner = this.player;
        this.turn = this.getgameStatusMessage();
      }
      this.player = this.player === 'X' ? 'O' : 'X';
      this.turn = this.getgameStatusMessage();
    }
  }

  // check for winner after every move
  winningMove() {
    const conditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonal
    ];
    for (const condition of conditions) {
      if ( this.squares[condition[0]]
          && this.squares[condition[0]] === this.squares[condition[1]]
          && this.squares[condition[1]] === this.squares[condition[2]]) {
            return true;
      }
    }
    return false;
  }

  // Reset game properties for a new game
  restartGame() {
    this.squares = Array(9).fill(null);
    this.player = 'X';
    this.winner = null;
    this.turn = `Player ${this.player}'s turn`;
  }
}
