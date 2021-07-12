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

  }

  onSaveChoice(){

    let formObj = this.saveForm.getRawValue();

    this.gameService.saveGame(formObj).subscribe();
  }
}

