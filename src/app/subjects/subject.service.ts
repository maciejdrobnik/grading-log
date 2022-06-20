import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {Subject} from "./subject.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private subjectsUrl = 'http://localhost:8080/subjects';


  constructor(private http: HttpClient) { }

  // for automatic update of number of students in parent component
  public totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  getCartItems() {
    return this.totalItems.asObservable();
  }

  /** GET students from the server */
  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.subjectsUrl);
  }

  /** POST: add a new student to the server */
  addSubject(subject: Subject, username: string): Observable<Subject> {
    const url = `${this.subjectsUrl}/${username}`;
    return this.http.put<Subject>(url, subject, httpOptions).pipe(
      tap((subjectAdded: Subject) => this.log(`added student id=`)),
      catchError(this.handleError<Subject>('addStudent'))
    );
  }

  /** GET student by id. Will 404 if id not found */
  getSubject(id: number): Observable<Subject> {
    const url = `${this.subjectsUrl}/${id}`;
    return this.http.get<Subject>(url).pipe(
      tap(_ => this.log(`fetched student id=${id}`)),
      catchError(this.handleError<Subject>(`getStudent id=${id}`))
    );
  }


  /** DELETE: delete the student from the server */
  deleteSubject(subject: Subject | number): Observable<Subject> {
    const id = typeof subject === 'number' ? subject : subject.id;
    const url = `${this.subjectsUrl}/${id}`;
    return this.http.delete<Subject>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted student id=${id}`)),
      catchError(this.handleError<Subject>('deleteStudent'))
    );
  }

  deleteAll(): Observable<Subject[]> {
    // @ts-ignore
    return this.http.delete<Subject[]>(this.subjectsUrl).pipe(
      catchError(this.handleError<Subject>('deleteStudent'))
    );
  }


  /** PUT: update the student on the server */
  updateSubject(subject: Subject, UpdatedBody: { subjectName: string;  }): Observable<any> {
    const url = `${this.subjectsUrl}/${subject.id}`;
    return this.http.patch(url, UpdatedBody);
  }

  putSubject(subject: Subject | number, UpdatedBody: { subjectName: string; }): Observable<any> {
    const id = typeof subject === 'number' ? subject : subject.id;
    let url;
    if (subject instanceof Subject) {
      url = `${this.subjectsUrl}/${subject.id}`;
    } else {
      url = `${this.subjectsUrl}/${subject}`;
    }
    return this.http.put(url, UpdatedBody);
  }

  putSubject2(subject: Subject | undefined, UpdatedBody: { subjectName: string; }): Observable<any> {
    let url;
    url = `${this.subjectsUrl}`;
    return this.http.put(url, UpdatedBody);
  }

  addUserToSubject(subjectId: number, userId:number):Observable<any> {
    const url = `${this.subjectsUrl}/${subjectId}/${userId}`;
    // @ts-ignore
    return this.http.post(url, subjectId);
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
    console.log('SubjectService: ' + message);
  }

  /** GET number of students from the server */
  getSubjectsCounter(): Observable<number> {
    const url = `${this.subjectsUrl}/counter`;
    return this.http.get<number>(url);
  }


}
