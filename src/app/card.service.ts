import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Card} from "./card";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseAPIUrl = 'http://localhost:8080/api/timeline/'

  enterDate = new Date();

  constructor(private http : HttpClient) { }

  getCardsList(id: number){

    return this.http.get<Card[]>(this.baseAPIUrl+id+'/card');
  }
}
