import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {UserService} from "../services/user.service";
import {User} from "../user/user.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  info: any;
  user: User;

  constructor(private token: TokenStorageService, private userService: UserService) {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      id: this.token.getId(),
    };

    this.user = new User("", "", "", "");
    this.userService.getUser(this.info.username).
    subscribe({
        next: (user:User) => {
          console.log(user);
          this.user = user;
        }
      }
    );
  }

  ngOnInit() {
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

}
