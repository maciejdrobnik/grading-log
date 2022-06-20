import {GradedTask} from "../graded-task/gradedtask.model";

export class Grade {
  grade: number;
  userId: number;
  task: GradedTask;

  constructor(grade: number, userId: number, task: GradedTask) {
    this.userId = userId;
    this.grade = grade;
    this.task = task;
  }
}
