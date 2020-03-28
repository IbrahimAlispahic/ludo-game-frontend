import { Player } from './player';
import { Dice } from './dice';

/* Defines the game entity */
export interface Game {
    id: number;
    dice1: Dice;
    dice2: Dice;
    numberOfPlayers: number;
    turnNumber: number;
    nextRollingPlayer: number;
    nextPlayingPlayer: number;
    active: boolean;
    players: Player[];
  }
  
  