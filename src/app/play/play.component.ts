import {Component, OnInit} from '@angular/core';
import {CardService} from "../card.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from 'rxjs';
import {Card} from '../card';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  cardsList: Observable<Card[]> | undefined;

  dateForm = this.formBuilder.group({
    date: 'Entrez la date',
  });

  dateClue: number = 0

  cardsToGuess: Card[] = []
  guessingCard: Card | undefined
  guessedCards: Card[] = []

  constructor(private cardService: CardService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    // First get the game id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const gameIdFromRoute = Number(routeParams.get('id'));

    // Get the cards's list of the current game
    this.cardService.getCardsList(gameIdFromRoute).subscribe(cardList => {
      this.cardsToGuess = cardList;

      // Randomize the guessing card
      const index = Math.floor(Math.random() * this.cardsToGuess.length)
      this.guessingCard = this.cardsToGuess[index];

      // Take back the guessing card from the list of cards to guess
      this.cardsToGuess.splice(index, 1)

      // Desérialisation du Json "this.guessingCard.date" en un objet Date afin d'en calculer l'année par getFullYear()
      this.dateClue = new Date(this.guessingCard.date).getFullYear()
    })
  }

  onDateChoice() {

    let chosenDate = this.dateForm.value.date

    // @ts-ignore
    let correctDate = new Date(this.guessingCard?.date).getFullYear()

    // If dates are matching, put the guessing card on guessed cards
    if (chosenDate == correctDate) {
      if (this.guessingCard) {
        this.guessedCards.push(this.guessingCard)
      }

      // Order the guessed cards by date
      this.guessedCards.sort(function (a, b) {
        return new Date(a.date).getFullYear() - new Date(b.date).getFullYear();
      });

      // Randomize the new guessing card
      // Take back the guessing card from the list of cards to guess
      const index = Math.floor(Math.random() * this.cardsToGuess.length)
      this.guessingCard = this.cardsToGuess[index];
      this.cardsToGuess.splice(index, 1)

      this.dateForm.reset()

    } else {
      alert('Non, ce n\'est pas cela ! Essaye encore !')
    }
  }
}
