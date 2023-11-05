import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig, Socket } from 'ngx-socket-io';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { LobbyComponent } from './lobby/lobby.component';
import { HomeComponent } from './home/home.component';
import { PlayerCardComponent } from './lobby/player-card/player-card.component';
import { JoinComponent } from './join/join.component';
import { PromptsComponent } from './prompts/prompts.component';
import { HostPromptsComponent } from './prompts/host-prompts/host-prompts.component';
import { PlayerPromptsComponent } from './prompts/player-prompts/player-prompts.component';
import { AnswersComponent } from './answers/answers.component';
import { HostAnswersComponent } from './answers/host-answers/host-answers.component';
import { PlayerAnswersComponent } from './answers/player-answers/player-answers.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { HostSlideshowComponent } from './slideshow/host-slideshow/host-slideshow.component';
import { PlayersSlideshowComponent } from './slideshow/players-slideshow/players-slideshow.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: { 
  withCredentials: false,
}};

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    LobbyComponent,
    HomeComponent,
    PlayerCardComponent,
    JoinComponent,
    PromptsComponent,
    HostPromptsComponent,
    PlayerPromptsComponent,
    AnswersComponent,
    HostAnswersComponent,
    PlayerAnswersComponent,
    SlideshowComponent,
    HostSlideshowComponent,
    PlayersSlideshowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
