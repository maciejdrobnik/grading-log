import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from "../user/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/exampleSecurity/user';
  private adminUrl = 'http://localhost:8080/exampleSecurity/admin';
  private user2url = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  getUserPage(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getAdminPage(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
  getUser(username: String): Observable<User> {
    const url = `${this.user2url}/${username}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${username}`)),
      catchError(this.handleError<User>(`getUser id=${username}`))
    );
  }

  getStudents(): Observable<User[]> {
    const url = `${this.user2url}/2`;
    return this.http.get<User[]>(url).pipe(
      tap(_ => this.log(`fetched user id`)),
      catchError(this.handleError<User[]>(`getUser id`))
    );
  }

  getUser2(id: string): Observable<User> {
    const url = `${this.user2url}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  getUsers(id: number): Observable<User[]> {
    const url = `${this.user2url}/${id}/2`;
    return this.http.get<User[]>(url).pipe(
      tap(_ => this.log(`fetched user id`)),
      catchError(this.handleError<User[]>(`getUser id`))
    );
  }

  addSubject(username: string, UpdatedBody: { subjectName: string }): Observable<any> {
    const url = `${this.user2url}/${username}`;
    return this.http.put(url, UpdatedBody);
    }


  deleteUser(subjectId:number, userId:number){
    const url = `${this.user2url}/${subjectId}/${userId}`;
    // @ts-ignore
    return this.http.patch(url);
  }
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
    console.log('UserService: ' + message);
  }
}
