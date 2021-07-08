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

  getGamesList(){

    return this.http.get<Game[]>(this.baseAPIUrl);
  }

  addGame(game: Game){

    return this.http.post<Game>(this.baseAPIUrl, game);
  }

  saveGame(game: Game){

    return this.http.put<Game>(this.baseAPIUrl, game);
  }

  deleteGame(id: number){

    return this.http.delete(this.baseAPIUrl+'/'+id);
  }
}
