
// Definition of a game Timeline received by API

import {Card} from "./card";

export interface Game{
  "id": number,
  "name": string,
  "creationDate": Date,
  "updateDate": Date,
  "category": string,
  "cardList": Card[]
}
