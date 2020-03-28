import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Game } from './game';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    //private gamesUrl = 'http://localhost:8080/api/LUDO';
    private gamesUrl = 'https://ludo-game-ibro.herokuapp.com/api/LUDO';

    constructor(private http: HttpClient
    ) { }

    getGames(): Observable<Game[]> {
        return this.http.get<Game[]>(this.gamesUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getGame(id: string): Observable<Game> {
        console.log("in game service: " + id)
        const url = `${this.gamesUrl}/${id}`;
        return this.http.get<Game>(url)
            .pipe(
                tap(data => console.log('getGame: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    createGame(numberOfPlayers: number, playerNames: string[]): Observable<Game> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post<Game>(this.gamesUrl, JSON.stringify({
            numberOfPlayers: numberOfPlayers,
            "playerNames": playerNames.map(value => value)
        }), { headers })
            .pipe(
                tap(data => console.log('createGame: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    roll(game: Game): Observable<Game> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.gamesUrl}/roll/${game.id}`;

        return this.http.put<Game>(url, { headers })
            .pipe(
                tap(data => console.log('rolling: ' + JSON.stringify(data))),
                map(data => data),
                catchError(this.handleError)
            );
    }

    play(game: Game, figureNo): Observable<Game> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.gamesUrl}/play/${game.id}/${figureNo}`;

        return this.http.put<Game>(url, { headers })
            .pipe(
                tap(data => console.log('playing: ' + JSON.stringify(data))),
                map(data => data),
                catchError(this.handleError)
            ); 
    }

    private handleError(err) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }

}