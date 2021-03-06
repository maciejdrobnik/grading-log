import {Subject} from "../subjects/subject.model";

export class Student {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
  subjects: Subject[];

  constructor(firstname: string, lastname: string, email: string, telephone: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.telephone = telephone;
    this.subjects = [];
  }
}
