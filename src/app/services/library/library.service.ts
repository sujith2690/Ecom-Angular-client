import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  constructor(private http: HttpClient) {}

  // private server: string = 'https://libestorary.onrender.com/book/';
  private server: string = 'http://localhost:5001/book/';

  allBooks(): Observable<any> {
    return this.http.get(`${this.server}`);
  }

  fetchCategoryBooks(category: string): Observable<any> {
    return this.http.get(`${this.server}category/${category}`);
  }

  getBookDetails(book: string): Observable<any> {
    return this.http.get(`${this.server}book/${book}`);
  }
}
