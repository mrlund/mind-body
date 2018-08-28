import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class MoodService {

  constructor(private http: HttpClient) { }

  postMood(model: any) {
    return this.http.post<any>(
      `/class/feed`,
      JSON.stringify(model),
      { headers: new HttpHeaders({ "Content-Type": "application/json" }) }
    ).pipe(catchError(this.handleError));
  }
  private handleError(error: any) {
    if (error.error.status == 401) {
      return throwError(error);
    }
    if (error.error) {
      return throwError(error.error);
    }
    let errMsg = error.error.message || "Server error";
    return throwError(errMsg);
  }
}
