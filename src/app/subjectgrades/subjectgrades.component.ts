import { Component, OnInit } from '@angular/core';
import {Subject} from "../subjects/subject.model";
import {SubjectService} from "../subjects/subject.service";
import {GradedTaskService} from "../graded-task/gradedtask.service";
import {User} from "../user/user.model";
import {TokenStorageService} from "../auth/token-storage.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-subjectgrades',
  templateUrl: './subjectgrades.component.html',
  styleUrls: ['./subjectgrades.component.css']
})
export class SubjectgradesComponent implements OnInit {
  tempSubject?:Subject;
  after:boolean = false;
  user?:User;

  constructor(private subjectService:SubjectService, private taskService:GradedTaskService, private token:TokenStorageService, private userService:UserService) {
    let username = this.token.getUsername();
    this.userService.getUser(username).subscribe(user=> this.user = user);
  }

  ngOnInit(): void {
  }
  getSubject(id:string){
    let id2 = parseInt(id);
    this.subjectService.getSubject(id2).subscribe(temp =>{
      for(let i = 0; i < temp.tasks.length;i++){
        // @ts-ignore
        this.taskService.getGrade(id2, temp.tasks[i].id, this.user.id).subscribe(grade =>
          temp.tasks[i].tempGrade = grade.grade);
      }
      this.tempSubject = temp;
      console.log(this.tempSubject);
      this.after = true;
    })
  }
}
