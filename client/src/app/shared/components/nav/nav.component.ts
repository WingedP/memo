import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BaseService } from '@services/base.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  public previousUrl: string = undefined;
  public currentUrl: string = undefined;
  public currentLocation: string = 'home';
  public showBackBtn: boolean = false;

  constructor(
    public router: Router,
    public navController: NavController,
    public baseService: BaseService,
  ) {
    this.getCurrentUrl();
  }

  public getCurrentUrl() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        this.currentLocation = this.currentUrl.slice(6);

        this.baseService.previousUrl = this.previousUrl;
        this.baseService.currentUrl = this.currentUrl;

        // show back btn or not
        if (this.currentLocation === 'home') {
          this.showBackBtn = false;
        } else {
          this.showBackBtn = true;
        }
      }
    })
  }

  public backToPreviousPage() {
    this.navController.back();
  }

}
