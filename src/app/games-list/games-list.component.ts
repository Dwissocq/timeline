import { Component, OnInit } from '@angular/core';
import {GameService} from "../game.service";

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  gamesList = this.gameService.getGamesList();

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  onDeleteChoice(id: number){

    this.gameService.deleteGame(id).subscribe();
  }

}
