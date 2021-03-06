import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from "rxjs";
import * as fromRootStore from "@platform/state";
import { Store } from '@ngrx/store';
import { CommentListPage } from "../comment-list/comment-list.page";
import { ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'gi-great-wall-item',
  templateUrl: './great-wall-item.component.html',
  styleUrls: ['./great-wall-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GreatWallItemComponent implements OnInit {
  @Input() post: any;
  @Input() userImage: string;
  comment: string;

  constructor(private sanitizer: DomSanitizer, private store: Store<fromRootStore.State>, private modalController: ModalController) { }

  ngOnInit() {

  }

  async presentModal(comments: any[]) {
    const modal = await this.modalController.create({
      component: CommentListPage,
      componentProps: { comments: comments }
    });
    return await modal.present();
  }

  postComment() {
    var obj = {
      postId: this.post.ClassFeedPostId,
      model: {
        ClassFeedPostId: this.post.ClassFeedPostId,
        PostText: this.comment
      }
    };
    this.store.dispatch(new fromRootStore.PostComment(obj))
  }
  public safeHtml(html) {
    if (html && html.length) {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
  }
}
