import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject} from "../subjects/subject.model";
import {SubjectService} from "../subjects/subject.service";
import {GradedTask} from "../graded-task/gradedtask.model";
import {GradedTaskService} from "../graded-task/gradedtask.service";
import {Grade} from "./grade.model";
import {TokenStorageService} from "../auth/token-storage.service";
import {User} from "../user/user.model";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
  taskid:number;
  id: number;
  students: User[] = [];
  grades:Grade[];
  subject: Subject = {subjectName: "", tasks: [], users: []};
  task: GradedTask = {taskName:"", description:"",grades:[], tempGrade:0};
  tempGrade: Grade = {grade: 0, userId: 0, task:this.task};
  user: User = new User("", "", "", "");
  admin:boolean;

  constructor(private route:ActivatedRoute, private subjectService: SubjectService, private taskService: GradedTaskService, private tokenService: TokenStorageService, private userService: UserService) {
    this.id = this.route.snapshot.params['id'];
    let name = this.route.snapshot.params['name'];
    this.taskid = parseInt(name);
    console.log(this.route.snapshot.params);
    this.taskService.getGrades().subscribe(tempGrades => {
      for(let i = 0; i < tempGrades.length; i++){
        if(tempGrades[i].task.id == this.taskid){
          this.grades.push(tempGrades[i]);
        }
      }
    });
    this.userService.getUsers(this.id).subscribe(tempUserList => {
      this.students = tempUserList;
      for(let i = 0; i < this.students.length; i++){
        this.taskService.getGrade(this.id, this.taskid, this.students[i].id).subscribe(
          tempGrade => {
            if(tempGrade != null) {
              this.students[i].tempGrade = tempGrade.grade;
            }
          });
      }
    })
    this.subjectService.getSubject(this.id).subscribe(tempSubject => {
      this.subject = tempSubject;
    });
    this.taskService.getTask(this.taskid).subscribe(tempTask=> this.task = tempTask);
    console.log(this.task.grades);
    this.grades = this.task.grades;
    let username = tokenService.getUsername();
    this.userService.getUser(username).subscribe(tempUser => {this.user = tempUser;this.user.id = tempUser.id;
    this.taskService.getGrade(this.id, this.taskid, tempUser.id).subscribe(tempGrade => this.tempGrade = tempGrade);
    console.log(tempUser.id)});
    let tokens = this.tokenService.getAuthorities();
    this.admin = false;
    for(let i = 0; i < tokens.length; i++){
      if(tokens[i] == "ROLE_ADMIN"){
        this.admin = true;
      }
    }
  }

  ngOnInit(): void {
  }

  addGrade(tempGrade:string, userId:number) {
    tempGrade.trim();
    let grade2 = parseInt(tempGrade);
    console.log(grade2);
    this.tempGrade = {grade: grade2, userId: userId, task: this.task};
    this.taskService.getTask(this.taskid).subscribe({
      next: (tempTask: GradedTask) => {
        this.task = tempTask;
        console.log(this.task)
        this.taskService.addGrade(this.tempGrade, this.id, this.taskid)
          .subscribe({
            next: (tempGrade: Grade) => {
              this.task.grades?.push(this.tempGrade);
            },
            error: () => {
            },
            complete: () => {
              if (this.task.grades != undefined) {
                this.taskService.totalItems.next(this.task.grades.length);
                console.log(this.task.grades.length);
              }
              this.userService.getUsers(this.id).subscribe(tempUserList => {
                this.students = tempUserList;
                for (let i = 0; i < this.students.length; i++) {
                  this.taskService.getGrade(this.id, this.taskid, this.students[i].id).subscribe(
                    tempGrade => {
                      if (tempGrade != null) {
                        this.students[i].tempGrade = tempGrade.grade;
                      }
                    });
                }
              })
              this.subjectService.getSubject(this.id).subscribe(tempSubject => this.subject = tempSubject);
              this.taskService.getTask(this.taskid).subscribe(tempTask => this.task = tempTask);
              console.log(this.task.grades);
            }
          });
      }
    });
  }
    deleteUser(userId:number){
        this.userService.deleteUser(this.id, userId).subscribe({
          next: (sth: ArrayBuffer) => {
            this.task.grades?.push(this.tempGrade);
          },
          error: () => {
          },
          complete: () => {
        this.userService.getUsers(this.id).subscribe(tempUserList => {
        this.students = tempUserList;
        for (let i = 0; i < this.students.length; i++) {
          this.taskService.getGrade(this.id, this.taskid, this.students[i].id).subscribe(
            tempGrade => {
              if (tempGrade != null) {
                this.students[i].tempGrade = tempGrade.grade;
              }
            });
        }
      })
    }});
    }
}
