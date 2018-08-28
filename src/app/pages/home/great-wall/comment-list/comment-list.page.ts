import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
@Component({
  selector: 'gi-comment-list',
  templateUrl: './comment-list.page.html',
  styleUrls: ['./comment-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListPage implements OnInit {
  comments: any[];
  constructor(private params: NavParams, private modalController: ModalController) {
    this.comments = params.data.comments;
  }
  dismiss() {
    this.modalController.dismiss();
  }
  ngOnInit() {
  }

}
