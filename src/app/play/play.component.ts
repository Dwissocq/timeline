import { Component, OnInit } from '@angular/core';
import { CardService } from "../card.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { Card } from '../card';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  cardsList: Observable<Card[]> | undefined;

  dateForm = this.formBuilder.group({
    date: '',
  });

  cardsToGuess: Card[] = []
  guessingCard: Card | undefined
  guessedCards: Card[] = []

  constructor(private cardService: CardService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    // First get the game id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const gameIdFromRoute = Number(routeParams.get('id'));

    this.cardService.getCardsList(gameIdFromRoute).subscribe(cardList =>{
      this.cardsToGuess = cardList;
      const index = Math.floor(Math.random() * this.cardsToGuess.length)
      this.guessingCard = this.cardsToGuess[index];
      this.cardsToGuess.splice(index, 1)
      console.log(this.cardsToGuess)
    })

  }

  onDateChoice() {

    // Si la date est bonne alors je change la gessingCard et je remplis mon tableau de guessedCard
    // Sinon je dis que le joueur est nul

    let chosenDate = this.dateForm.value.date

    // @ts-ignore
    let correctDate = new Date(this.guessingCard?.date).getFullYear()

    if(chosenDate==correctDate){
      if (this.guessingCard) {
        this.guessedCards.push(this.guessingCard)
        const index = Math.floor(Math.random() * this.cardsToGuess.length)
        this.guessingCard = this.cardsToGuess[index];
        this.cardsToGuess.splice(index, 1)


      }

    }else
      alert('https://media.tenor.com/images/9ddd7a97409c48e575a147c377cef97c/tenor.gif')
  }
}
