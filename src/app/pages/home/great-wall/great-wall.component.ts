import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
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
  tempPosts$: Observable<any[]>;
  loading$: Observable<boolean>;
  isAuthorized$: Observable<boolean>;
  userImage$: Observable<string>;
  constructor(private store: Store<fromRootStore.State>) { }
  nodes: any[];
  links: any[];
  ngOnInit() {
    this.store.dispatch(new fromRootStore.GetAllPosts());
    this.posts$ = this.store.select(fromRootStore.getAllPosts);
    this.tempPosts$ = this.store.select(fromRootStore.getAllPosts);
    this.loading$ = this.store.select(fromRootStore.getPostLoadLoading);
    this.isAuthorized$ = this.store.select(fromRootStore.getUserAuthenticated);
    this.userImage$ = this.store.select(fromRootStore.getUserImage);
    this.posts$.pipe(
      tap(x => this.formatNodeGraphData(x))
    ).subscribe();

  }

  formatNodeGraphData(feed) {
    let distinctNodes = {};
    let distinctLinks = {};
    let result = { nodes: [], links: [] };
    //console.log(feed);

    // DEV code only - to populate Ids and names while they're returned from API 
    // feed.forEach(post=>{
    //   post.UserId = post.Name;
    //   post.MiniAppId = "APP123";
    //   post.MiniAppName = "Cool MiniApp";
    //   post.Comments.forEach(comment => {
    //     comment.UserId = comment.Name;
    //   });
    // });

    feed.forEach(post => {

      //Add users to nodes
      if (!distinctNodes[post.UserId]) {
        distinctNodes[post.UserId] = true;
        result.nodes.push(this.newNode(post.UserId, post.Name, 1, post.ProfileImageUrl || 'assets/img/avatar.png'));
      }
      //Add apps to nodes
      if (!distinctNodes[post.MiniAppId || 1]) {
        distinctNodes[post.MiniAppId || 1] = true;
        var image = this.getImageForMiniApp(post.MiniAppName);
        result.nodes.push(this.newNode(post.MiniAppId || 1, post.MiniAppName.replace('_', ' ') || "MY_GOALS", 2, image));
      }
      //Link users to apps
      if (!distinctLinks[post.UserId + (post.MiniAppId || 1)]) {
        distinctLinks[post.UserId + (post.MiniAppId || 1)] = true;
        result.links.push(this.newLink(post.MiniAppId || 1, post.UserId, 1)); // Could "value" be 1 = user-to-app, 2 = user-to-user?
      }

      //Links users to other users 
      post.Comments.forEach(comment => {
        if (!distinctLinks[post.UserId + comment.UserId] && (!distinctLinks[comment.UserId + post.UserId])) {
          distinctLinks[post.UserId + comment.UserId] = true;
          result.links.push(this.newLink(post.UserId, comment.UserId, 2));
        }
      });
    });
    console.log(result);
    this.nodes = result.nodes;
    this.links = result.links;
    return result;
  }
  private newNode(id, name, group, img) {
    return { id: id, name: name, group: group, posx: 100, posy: 100, img: img }
  }
  private newLink(source, target, value) {
    return { source: source, target: target, value: value };
  }
  private getImageForMiniApp(appName) {
    if (appName == "COMPASS") {
      return "assets/img/compass-logo.png";
    }
    else if (appName == "MY_MOOD") {
      return "assets/img/myMood.svg";
    }
    else if (appName == "MY_HEALTH") {
      return "assets/img/myHealth.svg";
    }
    else if (appName == "MY_GOALS") {
      return "assets/img/myGoals.svg";
    }

  }
  nodeClick(item) {
    if (item.id == "1" || item.id == "2" || item.id == "3" || item.id == "4") {
      this.posts$ = this.tempPosts$.pipe(map(posts => {
        let list = posts.filter(post => post.MiniAppId === item.id);
        return list
      }));
    }
    else {
      this.posts$ = this.tempPosts$.pipe(map(posts => {
        let list = posts.filter(post => post.UserId === item.id || post.Comments.filter(comment => comment.UserId == item.id).length > 0);
        return list
      }));
    }
  }
  clearFilters() {

    this.posts$ = this.store.select(fromRootStore.getAllPosts);
  }

}
