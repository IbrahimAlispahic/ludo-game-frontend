import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { GameComponent } from './game.component';
import { GameActiveComponent } from './game-active.component';
import { PlayerComponent } from './player.component';

@NgModule({
  declarations: [GameComponent,
    GameActiveComponent,
    PlayerComponent],
  imports: [
    RouterModule.forChild([
      { path: 'game', component: GameComponent },
      { path: 'game/:id', component: GameActiveComponent }
    ]),
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class GameModule { }
