
// Définition du format d'un game Timeline reçu par l'API

import {Card} from "./card";

export interface Game{
  "id": number,
  "name": string,
  "creationDate": Date,
  "updateDate": Date,
  "category": string,
  "cardList": Card[]
}
