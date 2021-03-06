import {Component, OnInit} from '@angular/core';
import {UrlCustomer} from '../SiteUrlContext';
import {HeaderMenuComponent} from '../header-menu/header-menu.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'
    , '../../assets/css/bootstrap.css'
    , '../../assets/vendors/linericon/style.css'
    , '../../assets/css/font-awesome.min.css'
    , '../../assets/vendors/owl-carousel/owl.carousel.min.css'
    , '../../assets/vendors/lightbox/simpleLightbox.css'
    , '../../assets/vendors/nice-select/css/nice-select.css'
    , '../../assets/vendors/animate-css/animate.css'
    , '../../assets/vendors/popup/magnific-popup.css'
    , '../../assets/css/style.css'
    , '../../assets/css/responsive.css'
  ]
})
export class HomepageComponent implements OnInit {
  urlCustomer = new UrlCustomer();
  centerId: number;

  constructor(private router: Router) {
  }

  redirectToUrl(url: string) {
    HeaderMenuComponent.currentUrl = url;
    this.router.navigateByUrl(url);
  }

  ngOnInit() {
    if (HeaderMenuComponent.centerId == null) {
      console.log('hic');
      //redirect error
    } else {
      this.centerId = HeaderMenuComponent.centerId;
      console.log('yea');
    }
  }

}
