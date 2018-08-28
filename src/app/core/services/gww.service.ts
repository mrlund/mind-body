import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GwwService {

  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get<any>(
      `/class/feed/all`
    ).pipe(catchError(this.handleError));
  }

  postComment(postId: number, model: any) {
    return this.http.post<any>(
      `/class/feed/comment/${postId}`,
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
