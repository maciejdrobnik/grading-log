import {GradedTask} from "../graded-task/gradedtask.model";
import {User} from "../user/user.model";

export class Subject {
  id?: number;
  subjectName:string;
  tasks: GradedTask[];
  users:User[];

  constructor(subjectName: string, tasks: GradedTask[], users:User[]) {
    this.subjectName = subjectName;
    this.tasks = tasks;
    this.users = users;
  }
}
