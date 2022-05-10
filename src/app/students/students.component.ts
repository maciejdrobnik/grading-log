import { Component, OnInit } from '@angular/core';
import {Student} from "./student.model";
import {StudentService} from "./student.service";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  studentList?: Student[];
  student?: Student;
  tempStudent?: Student;


  constructor(private studentService: StudentService) { }

  ngOnInit() { this.getStudents();   }

  getStudent(id: string): void {
    // @ts-ignore
    this.studentService.getStudent(id)
      .subscribe(student => this.student = student);
  }
  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(studentList => this.studentList = studentList);
  }
  // Post-checked
  post(firstname: string, lastname: string, email: string, telephone: string): void {
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    telephone = telephone.trim();
    this.studentService.addStudent({ firstname, lastname, email, telephone } as Student)
      .subscribe({
        next: (student: Student) => { this.studentList?.push(student); },
        error: () => {},
        complete: () => {
          if (this.studentList != undefined) {
            this.studentService.totalItems.next(this.studentList.length);
            console.log(this.studentList.length);
          }
        }
  });
  }
  //delete-checked
  delete(student: Student): void {
    this.studentList = this.studentList?.filter(c => c !== student);
    this.studentService.deleteStudent(student).subscribe(() => {
        // for automatic update of number of students in parent component
      if(this.studentList != undefined) {
        this.studentService.totalItems.next(this.studentList.length);
        console.log(this.studentList.length);
      }
      }
    );
  }

  //deleteAll-checked
  deleteAll(): void {
    this.studentList = [];
    this.studentService.deleteAll().subscribe(() => {
        // for automatic update of number of students in parent component
        if(this.studentList != undefined) {
          this.studentService.totalItems.next(this.studentList.length);
          console.log(this.studentList.length);
        }
      }
    );
  }

  //patch-checked

  patch(student: Student, firstname: string, lastname: string, email: string, telephone: string): void {
    if(firstname.trim() !== '') {
      student.firstname = firstname.trim();
    }
    if(lastname.trim() !== '') {
      student.lastname = lastname.trim();
    }
    if(email.trim() !== '') {
      student.email = email.trim();
    }
    if(telephone.trim() !== '') {
      student.telephone = telephone.trim();
    }
    const newForm = { firstname: student.firstname, lastname: student.lastname, email:student.email, telephone: student.telephone}
    this.studentService.updateStudent(student, newForm).subscribe(() => {
        if(this.studentList != undefined) {
          this.studentService.totalItems.next(this.studentList.length);
          console.log(this.studentList.length);
        }
      }
    );
    firstname = '';
    lastname = '';
    email = '';
    telephone = '';
  }

  put(student: Student, firstname: string, lastname: string, email: string, telephone: string): void {
      student.firstname = firstname.trim();
      student.lastname = lastname.trim();
      student.email = email.trim();
      student.telephone = telephone.trim();
    const newForm = { firstname: student.firstname, lastname: student.lastname, email:student.email, telephone: student.telephone}
    this.studentService.putStudent(student, newForm).subscribe(() => {
        if(this.studentList != undefined) {
          this.studentService.totalItems.next(this.studentList.length);
          console.log(this.studentList.length);
        }
      }
    );
    firstname = '';
    lastname = '';
    email = '';
    telephone = '';
  }
  put2( firstname: string, lastname: string, email: string, telephone: string): void {
    // @ts-ignore
    this.tempStudent.firstname = firstname.trim();
    // @ts-ignore
    this.tempStudent.lastname = lastname.trim();
    // @ts-ignore
    this.tempStudent.email = email.trim();
    // @ts-ignore
    this.tempStudent.telephone = telephone.trim();
    // @ts-ignore
    const newForm = { firstname: this.tempStudent.firstname, lastname: this.tempStudent.lastname, email:this.tempStudent.email, telephone: this.tempStudent.telephone}
    this.studentService.putStudent2(this.tempStudent, newForm).subscribe(() => {
        if(this.studentList != undefined) {
          this.studentService.totalItems.next(this.studentList.length);
          console.log(this.studentList.length);
        }
      }
    );
    firstname = '';
    lastname = '';
    email = '';
    telephone = '';
  }
}

