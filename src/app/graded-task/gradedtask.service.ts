import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {GradedTask} from "./gradedtask.model";
import {Grade} from "../grade/grade.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GradedTaskService {

  private tasksurl = '' +  'http://localhost:8080/tasks';
  private gradeurl = '' +  'http://localhost:8080/grades';


  constructor(private http: HttpClient) { }

  // for automatic update of number of students in parent component
  public totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  getCartItems() {
    return this.totalItems.asObservable();
  }

  /** GET students from the server */
  getTasks(): Observable<GradedTask[]> {
    return this.http.get<GradedTask[]>(this.tasksurl);
  }


  /** POST: add a new student to the server */
  addTask(UpdatedBody: GradedTask, id: number): Observable<GradedTask> {
    const url =`${this.tasksurl}/${id}`;
    return this.http.put<GradedTask>(url, UpdatedBody, httpOptions).pipe(
      tap((taskAdded: GradedTask) => this.log(`added taskAdded id=`)),
      catchError(this.handleError<GradedTask>('addTask'))
    );
  }

  getGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.gradeurl);
  }


  addGrade(UpdatedBody:{grade: number, userId: number}, id: number, taskId:number): Observable<Grade> {
    const url =`${this.gradeurl}/${id}/${taskId}`;
    return this.http.post<Grade>(url, UpdatedBody, httpOptions).pipe(
      tap((taskAdded: Grade) => this.log(`added taskAdded id=`)),
      catchError(this.handleError<Grade>('addTask'))
    );
  }

  /** GET student by id. Will 404 if id not found */
  getTask(taskId: number): Observable<GradedTask> {
    const url = `${this.tasksurl}/${taskId}`;
    return this.http.get<GradedTask>(url).pipe(
      tap(_ => this.log(`fetched student id=${taskId}`)),
      catchError(this.handleError<GradedTask>(`getStudent id=${taskId}`))
    );
  }

  getGrade(subjectId: number, taskId: number, userId: number | undefined){
    const url = `${this.gradeurl}/${subjectId}/${taskId}/${userId}`;
    return this.http.get<Grade>(url).pipe(
      tap(_ => this.log(`fetched student id=${subjectId}`)),
      catchError(this.handleError<Grade>(`getStudent id=${subjectId}`))
    );
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
    console.log('TaskService: ' + message);
  }

  /** GET number of students from the server */
  getTaskCounter(): Observable<number> {
    const url = `${this.tasksurl}/counter`;
    return this.http.get<number>(url);
  }


}
