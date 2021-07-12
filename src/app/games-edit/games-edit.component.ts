import {Component, OnInit} from '@angular/core';
import {CardService} from "../card.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {GameService} from "../game.service";

@Component({
  selector: 'app-games-edit',
  templateUrl: './games-edit.component.html',
  styleUrls: ['./games-edit.component.css']
})
export class GamesEditComponent implements OnInit {

  cardsList: any;

  saveForm = this.formBuilder.group({
    id: 0,
    name: '',
    category: '',
    creationDate: ''
  });

  constructor(private cardService: CardService, private route: ActivatedRoute,
              private formBuilder: FormBuilder, private gameService: GameService) { }

  ngOnInit(): void {

    // First get the game id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const gameIdFromRoute = Number(routeParams.get('id'));

    this.cardsList = this.cardService.getCardsList(gameIdFromRoute)

    this.gameService.getGamesList().subscribe(gamesList=> {
        for (let game of gamesList){
          if(game.id===gameIdFromRoute)
          this.saveForm.patchValue({
            id: game.id,
            name: game.name,
            category: game.category,
            creationDate: game.creationDate
          })
        }
      })
  }

  onSaveChoice(){

    let formObj = this.saveForm.getRawValue();

    this.gameService.saveGame(formObj).subscribe();
  }
}

