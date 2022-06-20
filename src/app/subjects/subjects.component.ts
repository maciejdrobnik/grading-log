import { Component, OnInit } from '@angular/core';
import {Subject} from "./subject.model";
import {SubjectService} from "./subject.service";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjectList?: Subject[];
  subject?: Subject;
  tempSubject?: Subject;

constructor(private subjectService: SubjectService) { }

ngOnInit() { this.getSubjects();   }



getSubject(id: string): void {
  // @ts-ignore
  this.subjectService.getSubject(id)
    .subscribe(subject => this.subject = subject);
}
getSubjects(): void {
  this.subjectService.getSubjects()
    .subscribe(subjectList => this.subjectList = subjectList);
}
// Post-checked
post(subjectName: string): void {
  subjectName = subjectName.trim();
    this.subjectService.addSubject({ subjectName} as Subject, "admin")
    .subscribe({
      next: (subject: Subject) => { this.subjectList?.push(subject); },
      error: () => {},
      complete: () => {
        if (this.subjectList != undefined) {
          this.subjectService.totalItems.next(this.subjectList.length);
          console.log(this.subjectList.length);
        }
      }
    });
}
//delete-checked
delete(subject: Subject): void {
  this.subjectList = this.subjectList?.filter(c => c !== subject);
  this.subjectService.deleteSubject(subject).subscribe(() => {
      // for automatic update of number of students in parent component
      if(this.subjectList != undefined) {
        this.subjectService.totalItems.next(this.subjectList.length);
        console.log(this.subjectList.length);
      }
    }
  );
}

//deleteAll-checked
deleteAll(): void {
  this.subjectList = [];
  this.subjectService.deleteAll().subscribe(() => {
      // for automatic update of number of students in parent component
      if(this.subjectList != undefined) {
        this.subjectService.totalItems.next(this.subjectList.length);
        console.log(this.subjectList.length);
      }
    }
  );
}

//patch-checked

patch(subject: Subject, subjectName: string): void {
  if(subjectName.trim() !== '') {
    subject.subjectName = subjectName.trim();
}

const newForm = { subjectName: subject.subjectName}
this.subjectService.updateSubject(subject, newForm).subscribe(() => {
    if(this.subjectList != undefined) {
      this.subjectService.totalItems.next(this.subjectList.length);
      console.log(this.subjectList.length);
    }
  }
);
  subjectName = '';
}

put(subject: Subject, subjectName: string): void {
  subject.subjectName = subjectName.trim();
  const newForm = { subjectName: subject.subjectName}
  this.subjectService.putSubject(subject, newForm).subscribe(() => {
      if(this.subjectList != undefined) {
        this.subjectService.totalItems.next(this.subjectList.length);
        console.log(this.subjectList.length);
      }
    }
  );
  subjectName = '';
}
put2(subjectName: string): void {
  // @ts-ignore
  this.tempSubject.subjectName = subjectName.trim();
  // @ts-ignore
  const newForm = { subjectName: this.tempSubject.subjectName}
  this.subjectService.putSubject2(this.tempSubject, newForm).subscribe(() => {
      if(this.subjectList != undefined) {
        this.subjectService.totalItems.next(this.subjectList.length);
        console.log(this.subjectList.length);
      }
    }
  );
  subjectName = '';
}
}
