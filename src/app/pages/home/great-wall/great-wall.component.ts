import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from "rxjs";
import * as fromRootStore from "../../../../girls-platform/state/";
import { Store } from '@ngrx/store';

@Component({
  selector: 'gi-great-wall',
  templateUrl: './great-wall.component.html',
  styleUrls: ['./great-wall.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GreatWallComponent implements OnInit {
  posts$: Observable<any[]>;
  loading$: Observable<boolean>;
  isAuthorized$: Observable<boolean>;
  constructor(private store: Store<fromRootStore.State>) { }

  ngOnInit() {
    this.store.dispatch(new fromRootStore.GetAllPosts());
    this.posts$ = this.store.select(fromRootStore.getAllPosts);
    this.posts$.subscribe(x => console.log(x));
    this.loading$ = this.store.select(fromRootStore.getPostLoadLoading);
    this.isAuthorized$ = this.store.select(fromRootStore.getUserAuthenticated);
  }

}
