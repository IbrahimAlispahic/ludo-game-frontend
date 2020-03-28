import { Player } from './player';

export interface Figure {
    id: number;
    score: number;
    player: Player;
    firstRoll: boolean;
    playable: boolean;
}