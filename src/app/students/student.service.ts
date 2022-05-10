import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {Student} from "./student.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentsUrl = 'http://localhost:8080/students';


  constructor(private http: HttpClient) { }

  // for automatic update of number of students in parent component
  public totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  getCartItems() {
    return this.totalItems.asObservable();
  }

  /** GET students from the server */
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  /** POST: add a new student to the server */
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student, httpOptions).pipe(
      tap((studentAdded: Student) => this.log(`added student id=${studentAdded.id}`)),
      catchError(this.handleError<Student>('addStudent'))
    );
  }

  /** GET student by id. Will 404 if id not found */
  getStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url).pipe(
      tap(_ => this.log(`fetched student id=${id}`)),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  /** DELETE: delete the student from the server */
  deleteStudent(student: Student | number): Observable<Student> {
    const id = typeof student === 'number' ? student : student.id;
    const url = `${this.studentsUrl}/${id}`;
    return this.http.delete<Student>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted student id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  deleteAll(): Observable<Student[]> {
    // @ts-ignore
    return this.http.delete<Student[]>(this.studentsUrl).pipe(
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }


  /** PUT: update the student on the server */
  updateStudent(student: Student, UpdatedBody: { firstname: string; lastname: string; email: string; telephone: string; }): Observable<any> {
    const url = `${this.studentsUrl}/${student.id}`;
    return this.http.patch(url, UpdatedBody);
  }

  putStudent(student: Student | number, UpdatedBody: { firstname: string; lastname: string; email: string; telephone: string; }): Observable<any> {
    const id = typeof student === 'number' ? student : student.id;
    let url;
    if (student instanceof Student) {
      url = `${this.studentsUrl}/${student.id}`;
    } else {
      url = `${this.studentsUrl}/${student}`;
    }
    return this.http.put(url, UpdatedBody);
  }

  putStudent2(student: Student | undefined, UpdatedBody: { firstname: string; lastname: string; email: string; telephone: string }): Observable<any> {
    let url;
    url = `${this.studentsUrl}`;
    return this.http.put(url, UpdatedBody);
  }




  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a StudentService message with the MessageService */
  private log(message: string) {
    console.log('StudentService: ' + message);
  }

  /** GET number of students from the server */
  getStudentsCounter(): Observable<number> {
    const url = `${this.studentsUrl}/counter`;
    return this.http.get<number>(url);
  }

  //updatedCounter(dataAsParams) {
  //  this.totalItems.next(dataAsParams);
  //}
}
