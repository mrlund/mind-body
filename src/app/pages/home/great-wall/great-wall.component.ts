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
  loading$: Observable<boolean>;
  isAuthorized$: Observable<boolean>;
  constructor(private store: Store<fromRootStore.State>) { }

  ngOnInit() {
    this.store.dispatch(new fromRootStore.GetAllPosts());
    this.posts$ = this.store.select(fromRootStore.getAllPosts);
    this.loading$ = this.store.select(fromRootStore.getPostLoadLoading);
    this.isAuthorized$ = this.store.select(fromRootStore.getUserAuthenticated);

    this.posts$.pipe(
      tap(x => this.formatNodeGraphData(x))
    ).subscribe();

  }
  
  formatNodeGraphData(feed){
    let distinctNodes = {};
    let distinctLinks = {};
    let result = { nodes: [], links: []};
    console.log(feed);

    // DEV code only - to populate Ids and names while they're returned from API 
    // feed.forEach(post=>{
    //   post.UserId = post.Name;
    //   post.MiniAppId = "APP123";
    //   post.MiniAppName = "Cool MiniApp";
    //   post.Comments.forEach(comment => {
    //     comment.UserId = comment.Name;
    //   });
    // });

    feed.forEach(post=>{

      //Add users to nodes
      if (!distinctNodes[post.UserId]){
        distinctNodes[post.UserId] = true;
        result.nodes.push(this.newNode(post.UserId, post.Name, 1));
      }
      //Add apps to nodes
      if (!distinctNodes[post.MiniAppId]){
        distinctNodes[post.MiniAppId] = true;
        result.nodes.push(this.newNode(post.MiniAppId, post.MiniAppName, 2));
      }
      //Link users to apps
      if (!distinctLinks[post.UserId + post.MiniAppId]){
        distinctLinks[post.UserId + post.MiniAppId] = true;
        result.links.push(this.newLink(post.MiniAppId, post.UserId, 2)); // Could "value" be 1 = user-to-app, 2 = user-to-user?
      }

      //Links users to other users 
      post.Comments.forEach(comment => {
        if (!distinctLinks[post.UserId + comment.UserId] && (!distinctLinks[comment.UserId + post.UserId])){
          distinctLinks[post.UserId + comment.UserId] = true;
          result.links.push(this.newLink(post.UserId, comment.UserId, 1)); 
        }
      });
    });
    console.log(result);
    return result;
  }
  private newNode(id, name, group){
    return { id: id, name: name, group: group, posx: 100, posy: 100, img: "assets/img/avatar.png" }
  }
  private newLink(source, target, value){
    return { source: source, target: target, value: value };
  }
  nodeClick(item) {
    console.log(item);
    this.posts$ = this.posts$.pipe(map(post => {
      let list = post.filter(item => item.Name === "Akash12");
      return list
    }));
  }

}
