import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Game } from "./game";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  baseAPIUrl = 'http://localhost:8080/api/timeline'

  name = String();
  category = String();
  creationDate = new Date();

  constructor(public http: HttpClient,) { }

  // Get the list of all the Timeline games
  getGamesList(){

    return this.http.get<Game[]>(this.baseAPIUrl);
  }

  // Add a Timeline game
  addGame(game: Game){

    return this.http.post<Game>(this.baseAPIUrl, game);
  }

  // Save the modifications of a Timeline game
  saveGame(game: Game){

    return this.http.put<Game>(this.baseAPIUrl, game);
  }

  // Delete a Timeline game
  deleteGame(id: number){

    return this.http.delete(this.baseAPIUrl+'/'+id);
  }
}
