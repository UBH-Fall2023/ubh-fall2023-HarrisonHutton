import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { CreateLobbyComponent } from './create-lobby/create-lobby.component';

const routes: Routes = [
  { path: '', component: AppLayoutComponent, children: [
    { path: '', component: CreateLobbyComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
