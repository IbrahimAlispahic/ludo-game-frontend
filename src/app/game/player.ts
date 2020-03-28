import { Game } from './game';
import { Figure } from './figure';

export interface Player {
    id: number;
    name: string;
    score: number;
    winner: boolean;
    figures: Figure[];
    currentFigure: Figure;
    game: Game;
    maxRolls: boolean;
    
}