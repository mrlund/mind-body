import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'gi-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    public router: Router
  ) { }
  goToDetail(menu: string) {
    this.router.navigateByUrl(
      `home/${menu})`
    );
  }
}
