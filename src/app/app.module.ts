import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PlayComponent } from './play/play.component';
import { RouterModule } from "@angular/router";
import { GamesListComponent} from "./games-list/games-list.component";
import { GamesEditComponent } from './games-edit/games-edit.component';
import { GamesAddComponent } from './games-add/games-add.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    GamesListComponent,
    GamesEditComponent,
    GamesAddComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: GamesListComponent},
      {path: 'play/:id', component: PlayComponent},
      {path: 'edit/:id', component: GamesEditComponent},
      {path: 'add', component: GamesAddComponent}
    ]),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
