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
      this.cardsToGuess=cardList;
      this.guessingCard= this.cardsToGuess.pop();
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
        this.cardsToGuess.slice(this.cardsToGuess.length, 1)
        this.guessingCard=this.cardsToGuess.pop()
      }

    }else console.log("Try again !")
  }
}
