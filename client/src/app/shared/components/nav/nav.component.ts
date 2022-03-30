import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavController, ViewDidEnter, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public previousUrl: string = undefined;
  public currentUrl: string = undefined;
  public currentLocation: any = 'home';

  constructor(
    public router: Router,
    public navController: NavController,
  ) {
    this.getCurrentUrl();
  }

  ngOnInit() {
    // empty
    console.log(11111, this.currentLocation);

  }

  public getCurrentUrl() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        this.currentLocation = this.currentUrl.slice(6);
      }
    })
  }

}
