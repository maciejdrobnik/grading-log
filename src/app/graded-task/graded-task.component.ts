import {Component, Input, OnInit} from '@angular/core';
import {SubjectService} from "../subjects/subject.service";
import {Subject} from "../subjects/subject.model";
import {GradedTask} from "./gradedtask.model";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../auth/token-storage.service";
import {GradedTaskService} from "./gradedtask.service";
import {User} from "../user/user.model";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-graded-task',
  templateUrl: './graded-task.component.html',
  styleUrls: ['./graded-task.component.css']
})
export class GradedTaskComponent implements OnInit {
  tasks: GradedTask[];
  subject: Subject = {tasks: [], subjectName: "", users:[]};
  students:User[] = [];
  id: number;
  admin: boolean;

  constructor(private subjectService: SubjectService, private  route: ActivatedRoute, private router: Router, private token: TokenStorageService, private taskService: GradedTaskService, private userService: UserService) {
    this.id = this.route.snapshot.params['id'];
    this.subjectService.getSubject(this.id).subscribe(tempSubject => this.subject = tempSubject);
    this.userService.getStudents().subscribe(tempStudents => {
      this.students = tempStudents;
      console.log(tempStudents);
    });
    this.tasks = this.subject.tasks;
    let tokens = this.token.getAuthorities();
    this.admin = false;
    for(let i = 0; i < tokens.length; i++){
      if(tokens[i] == "ROLE_ADMIN"){
        this.admin = true;
      }
    }
    }

  ngOnInit(): void {
  }

  addTask(taskName:string, description:string){
    taskName.trim();
    description.trim();
    const newForm = { taskName: taskName, description: description, grades: [], tempGrade:0};
    this.taskService.addTask(newForm as GradedTask, this.id)
      .subscribe({
        next: (task: GradedTask) => {this.subject.tasks?.push(task);
          this.tasks?.push(task)},
        error: () => {},
        complete: () => {
          if (this.subject.tasks != undefined) {
            this.taskService.totalItems.next(this.subject.tasks.length);
            console.log(this.subject.tasks.length);
          }
          this.subjectService.getSubject(this.id).subscribe(tempSubject => this.subject = tempSubject);
          this.tasks = this.subject.tasks;
        }
  });
  }

  addToSubject(userID:number){
      this.subjectService.addUserToSubject(this.id, userID).subscribe();
  }

  onSelect(task: GradedTask, subject:Subject){
    console.log(this.route.url);
    this.router.navigate(['/user',subject.id ,task.id]);
}

}
