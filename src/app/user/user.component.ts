import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from "./user.model";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";
import {Subject} from "../subjects/subject.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  board?: string;
  errorMessage?: string;
  user:User = new User("", "", "", "");

  constructor(private userService: UserService, private token: TokenStorageService, private router: Router) {
    this.user.subjects = [];
    let username = this.token.getUsername();
    this.userService.getUser(username).subscribe({
      next:(tempUser )=> {this.user = tempUser;},
      error: () => {},
      complete: () => {
        console.log(this.user);
    }
  })
  }

  ngOnInit() {
    this.userService.getUserPage().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }
  onSelect(subject: Subject){
    this.router.navigate(['/user', subject.id]);
  }
}
