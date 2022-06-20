import {Grade} from "../grade/grade.model";

export class GradedTask {
  taskName: string;
  description: string;
  id?: number;
  grades:Grade[];
  tempGrade: number;

  constructor(taskName: string, description: string, grades: Grade[]) {
    this.description = description;
    this.taskName = taskName;
    this.grades = grades;
    this.tempGrade = 0;
  }
}
