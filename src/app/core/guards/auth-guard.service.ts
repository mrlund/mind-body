import { Injectable } from "@angular/core";
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

import { Store } from "@ngrx/store";
import { map, take, mergeMap, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    if (!this.authService.isUserAuthenticated()) {
      this.router.navigateByUrl("/login");
      return false;
    }
    return true;
  }
}
