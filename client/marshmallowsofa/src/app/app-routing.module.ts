import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { CreateLobbyComponent } from './lobby/lobby.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: AppLayoutComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'lobby', component: CreateLobbyComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
