import { Component } from '@angular/core';
import { Player } from './shared/player';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public hashSquad: Player[][];
  public numberOfMove: number;
  public currentlyPlayer: string;
  public currentlyWinner: string;
  public numberWinners: { playerX: number; playerO: number };

  constructor() {

    this.currentlyPlayer = 'X';

    this.numberWinners = { playerO: 0, playerX: 0 };

    this.startGame();
  }

  private startGame() {
    this.currentlyWinner = undefined;
    this.numberOfMove = 0;
    this.hashSquad = [
      [{}, {}, {}],
      [{}, {}, {}],
      [{}, {}, {}],
    ];
  }

  move(move: Player, indexColumn: number, indexRow: number): void {

    if (move.clicked || this.currentlyWinner) return;

    this.numberOfMove++;

    move.clicked = !move.clicked;

    move.choice = this.currentlyPlayer;

    if (this.numberOfMove > 4 && this.checkWinner(move.choice, indexColumn, indexRow)) {
      this.currentlyWinner = move.choice;
      this.setCounterWinner(this.currentlyWinner);
      return;
    }

    this.currentlyPlayer = this.currentlyPlayer === 'X' ? 'O' : 'X';
  }
  setCounterWinner(currentlyWinner: string) {

    if (currentlyWinner.toUpperCase() === 'X') this.numberWinners.playerX++;
    else this.numberWinners.playerO++;

  }

  checkWinner(myChoice: string, indexColumn: number, indexRow: number): boolean {

    return this.thereIsSameChoiceByRow(myChoice, indexRow) ||
      this.thereIsSameChoiceByColumn(myChoice, indexColumn) ||
      this.thereIsByXChoice(myChoice);

  }

  thereIsSameChoiceByRow(myChoice: string, indexRow: number): boolean {

    return this.hashSquad[indexRow].every(column => column.choice === myChoice);

  }

  thereIsSameChoiceByColumn(myChoice: string, indexColumn: number): boolean {

    return this.hashSquad.every(row => row[indexColumn].choice === myChoice);

  }

  thereIsByXChoice(myChoice: string): boolean {

    const leftToRight = this.hashSquad.every((row, indexRow) => row[indexRow].choice === myChoice);


    const rightToLeft = this.hashSquad.every((row, indexRow) => this.isSomeChoiceDecreasing(indexRow, row, myChoice));

    return (leftToRight || rightToLeft);

  }

  private isSomeChoiceDecreasing(indexRow: number, row: Player[], myChoice: string): boolean {

    const arrayLenght = (this.hashSquad.length - 1);

    const indexSearch = arrayLenght - indexRow;

    return row[indexSearch].choice === myChoice;
  }

  disabledBtn(): boolean {
    return this.numberOfMove < 5;
  }

  resetGame(): void {
    this.hashSquad.length = 0;
    this.startGame();
  }
}
