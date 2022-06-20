import {Subject} from "../subjects/subject.model";

export class User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
  private _subjects: Subject[];
  tempGrade: number;

  constructor(firstname: string, lastname: string, email: string, telephone: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.telephone = telephone;
    this._subjects = [];
    this.tempGrade = 0;
  }

  get subjects(): Subject[] {
    return this._subjects;
  }

  set subjects(value: Subject[]) {
    this._subjects = value;
  }
}
