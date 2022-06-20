import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../user/user.model";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  tempStudent?:User;
  after:boolean = false;

  constructor(private userService:UserService) {
  }
  getStudent(id:string){
    this.userService.getUser(id).subscribe(temp =>{
      this.tempStudent = temp;
      console.log(this.tempStudent);
      this.after = true;
    })
  }

  ngOnInit(): void {
  }

}
