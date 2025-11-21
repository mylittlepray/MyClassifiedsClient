import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BbService {
  private url: string = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  getBbs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}bbs/`);
  }

  getBb(pk: number): Observable<any> {
    return this.http.get<any>(`${this.url}bbs/${pk}/`);
  }

  getComments(pk: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}bbs/${pk}/comments/`);
  }

  addComment(bb: number, author: string, password: string, content: string): Observable<any> {
    const comment = { bb, author, content };
    
    // Правильное кодирование UTF-8 для Basic Auth
    const credentials = `${author}:${password}`;
    const base64Credentials = btoa(unescape(encodeURIComponent(credentials)));
    
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64Credentials
      })
    };
    
    return this.http.post<any>(`${this.url}bbs/${bb}/comments/`, comment, options)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
