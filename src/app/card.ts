
// Définition du format d'une carte Timeline reçue par l'API

export interface Card{
  "id": number,
  "name": string,
  "date": Date,
  "imageUrl": string,
  "description": string
}
