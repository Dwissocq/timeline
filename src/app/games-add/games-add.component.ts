import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {GameService} from "../game.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-games-add',
  templateUrl: './games-add.component.html',
  styleUrls: ['./games-add.component.css']
})
export class GamesAddComponent implements OnInit {

  addForm = this.formBuilder.group({
    name: '',
    category: '',
    creationDate: ''
  });

  constructor(private formBuilder: FormBuilder, private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
  }

  onAddChoice(){

    let formObj = this.addForm.getRawValue();

    this.gameService.addGame(formObj).subscribe(() => this.router.navigate(['']));

  }
}
