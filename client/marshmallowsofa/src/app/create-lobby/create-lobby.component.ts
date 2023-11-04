import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-lobby',
  templateUrl: './create-lobby.component.html',
  styleUrls: ['./create-lobby.component.css']
})
export class CreateLobbyComponent {
  constructor(private http: HttpClient) { }

  createLobby() {
    this.http.get('http://localhost:3000/createLobby', {
      withCredentials: false
    }).subscribe((data) => {
      console.log(data);
    });
  }
}
