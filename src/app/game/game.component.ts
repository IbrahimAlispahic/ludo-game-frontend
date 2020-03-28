import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { GameService } from './game.service';
import { Game } from './game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  pageTitle = 'NEW GAME';
  gameForm: FormGroup;
  numberOfPlayers: number;
  errorMessage: string;
  game: Game;
  playerNames: string[];

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(private fb: FormBuilder,
    private gameService: GameService,
    private router: Router
  ) { }

  get names(): FormArray {
    return this.gameForm.get('names') as FormArray;
  }

  ngOnInit(): void {
    this.gameForm = this.fb.group({
      numberOfPlayers: ['', Validators.required],
      names: this.fb.array([])
    });
    this.onChanges();
  }

  onChanges(): void {
    this.gameForm.valueChanges.subscribe(val => {
      console.log("value: " + val)
    });
  }

  addName(): void {
    this.names.push(new FormControl());
  }

  deleteName(index: number): void {
    this.names.removeAt(index);
    this.names.markAsDirty();
  }

  getGames(): void {
    this.gameService.getGames()
      .subscribe();
  }

  getGame(id: string): void {
    this.gameService.getGame(id)
      .subscribe({
        next: (game: Game) => console.log(game),
        error: err => this.errorMessage = err
      });
  }

  saveGame(): void {
    if (this.gameForm.valid) {
      if (this.gameForm.dirty) {
        this.numberOfPlayers = this.gameForm.controls['numberOfPlayers'].value
        this.playerNames = this.gameForm.controls['names'].value
        this.gameService.createGame(this.numberOfPlayers, this.playerNames)
          .subscribe({
            next: (game) => this.onSaveComplete(game),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  onSaveComplete(game): void {
    // Reset the form to clear the flags
    this.gameForm.reset();
    this.game = game;
    this.router.navigate([`/game/${game.id}`]);
    console.log("game: " + this.game.id);
  }

  handleClick(): void {
    this.numberOfPlayers = this.gameForm.controls['numberOfPlayers'].value
  }

}
