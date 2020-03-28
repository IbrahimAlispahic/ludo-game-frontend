import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameService } from './game.service';
import { Game } from './game';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit, DoCheck {
  color = 'green';
  @Input() game: Game;
  errorMessage = '';
  @Output() rollingClicked: EventEmitter<Number> = new EventEmitter<Number>();
  isDisabled: boolean = true;
  currentPlayerIndex: number = 1;

  objExp = {
    'position': 'relative',
    'background-color': this.color,
    'border': '2px solid black',
    'border-radius': '25px'
  }

  constructor(private gameService: GameService,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngDoCheck() { }

  roll(): void {
    this.gameService.roll(this.game)
      .subscribe({
        next: (data) => {
          this.color = 'black'
          //this.objExp["background-color"] = this.color
          //this.game = {...data}
          this.game.dice1.value = data.dice1.value
          this.game.dice2.value = data.dice2.value
          this.game.players = data.players
          this.game.nextRollingPlayer = data.nextRollingPlayer
          this.game.nextPlayingPlayer = data.nextPlayingPlayer
          this.game.turnNumber = data.turnNumber

          if (!(data.dice1.value === 6 && data.dice2.value === 6 &&
            data.players[this.currentPlayerIndex - 1].currentFigure.firstRoll)) {
            if (this.game.nextRollingPlayer == 2)
              this.currentPlayerIndex = 1;
            else this.currentPlayerIndex++;
          }

          this.rollingClicked.emit(this.currentPlayerIndex);

          console.log("In roll() method " + this.game.nextRollingPlayer)   //location.reload()
        },
        error: err => this.errorMessage = err
      })
  }

  play(figureNo): void {
    console.log("Figure nO: ", figureNo);
    this.gameService.play(this.game, figureNo)
      .subscribe({
        next: (data) => {

          this.game.dice1.value = data.dice1.value
          this.game.dice2.value = data.dice2.value
          this.game.players = data.players
          this.game.nextRollingPlayer = data.nextRollingPlayer
          this.game.nextPlayingPlayer = data.nextPlayingPlayer
          this.game.turnNumber = data.turnNumber

          console.log("In play() method " + this.game.nextRollingPlayer)   //location.reload()
        },
        error: err => this.errorMessage = err
      })
  }

  figureHasScore(score: number): boolean {
    const currentPlayer = this.game.players[this.currentPlayerIndex];
    for (let figure of currentPlayer.figures) {
      if (figure.score === score) {
        return true;
      }
    }
    return false;
  }

  playerCanMove(): boolean {
    for (let figure of this.game.players[this.game.nextPlayingPlayer - 1].figures) {
      if (figure.playable) {
        return true;
      }
    }
    return false;
  }

}
