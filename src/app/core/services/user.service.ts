import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }
    updateProfile(model: any) {
        return this.http.post<any>(
            `/user/profile`,
            JSON.stringify(model),
            { headers: new HttpHeaders({ "Content-Type": "application/json" }) }
        ).pipe(catchError(this.handleError));
    }

    getUserProfile() {
        return this.http.get<any>(
            `/user/profile`
        ).pipe(catchError(this.handleError));
    }
    getEnrollmentList() {
        return this.http.get<any>(
            `/class/enroll-list`
        ).pipe(catchError(this.handleError));
    }

    uploadProfileImage(
        files: any
    ) {
        files = files.files;
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i], files[i].name);
        }
        return this.http.post(
            "/profile/mediaitems",
            formData
        ).pipe(catchError(this.handleError));
    }

    enrollClass(code: string) {
        return this.http.get<any>(
            `/class/enroll/${code}`
        ).pipe(catchError(this.handleError));
    }

    leaveClass(id: number) {
        return this.http.get<any>(
            `/class/leave-class/${id}`
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
