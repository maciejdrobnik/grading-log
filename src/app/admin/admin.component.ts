import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from "../user/user.model";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";
import {Subject} from "../subjects/subject.model";
import {Student} from "../students/student.model";
import {SubjectService} from "../subjects/subject.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  board?: string;
  errorMessage?: string;
  user: User = new User("", "", "", "");
  username:string;
  // check: boolean;

  constructor(private userService: UserService, private token: TokenStorageService, private router: Router, private subjectservice: SubjectService) {
    this.username = token.getUsername();
    console.log(this.username);
    let tempUser;
    tempUser = this.userService.getUser(this.username);
    const observer = {
      next: (tempUser: User ) => {
        this.user = tempUser;
      }
    }
    tempUser.subscribe(observer);
    // let tokens = token.getAuthorities();
    // this.check = false;
    // for(let i =0; i < tokens.length; i++){
    //   if(tokens[i] == "ROLE_ADMIN"){
    //     this.check = true;
    //   }
    // }
  }

  ngOnInit() {
    this.userService.getAdminPage().subscribe(
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
  addSubject(subjectName: string){
    subjectName = subjectName.trim();
    const newForm = { subjectName: subjectName};
    this.subjectservice.addSubject({subjectName} as Subject, this.username).
    subscribe({
      next: (subject: Subject) => { this.user.subjects?.push(subject); },
      error: () => {},
      complete: () => {
        if (this.user.subjects != undefined) {
          this.subjectservice.totalItems.next(this.user.subjects.length);
          console.log(this.user.subjects.length);
        }
        let tempUser;
        tempUser = this.userService.getUser(this.username);
        const observer = {
          next: (tempUser: User ) => {
            this.user = tempUser;
          }
        }
        tempUser.subscribe(observer);
      }
    });
  }
}

