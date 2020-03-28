import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { ActivatedRoute } from '@angular/router';
import { Game } from './game';

@Component({
  selector: 'app-game-active',
  templateUrl: './game-active.component.html',
  styleUrls: ['./game-active.component.css']
})
export class GameActiveComponent implements OnInit {

  pageTitle = 'Game Details';
  errorMessage = '';
  game: Game | undefined;
  currentPlayerIndex: number = 1;
  
  constructor(private route: ActivatedRoute,
    private gameService: GameService ) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    console.log("in ng init of game-active param: " + param);

    if (param) {
      this.getGame(param);
    }
    
  }

  getGame(id: string) {
    this.gameService.getGame(id).subscribe({
      next: game => {
        this.game = game
      },
      error: err => this.errorMessage = err
    });
  }

  message(message: number) {
    this.currentPlayerIndex = message;
  }

}
