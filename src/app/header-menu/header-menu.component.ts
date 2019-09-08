import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UrlCustomer} from '../SiteUrlContext';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Course} from '../models/course';
import {APIContext, APICustomer} from '../APIContext';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css'
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
export class HeaderMenuComponent implements OnInit, OnDestroy {
  apiContext = new APIContext();
  apiCustomer = new APICustomer();
  centerName = 'ECM';

  static currentUrl: string;
  static centerId: number;
  // urlName: string;
  header: any;
  sticky: any;
  urlCustomer = new UrlCustomer();

  getCurrentUrl(): string {
    return HeaderMenuComponent.currentUrl;
  }

  getCenterId(): number {
    return HeaderMenuComponent.centerId;
  }

  redirectToUrl(url: string) {
    HeaderMenuComponent.currentUrl = url;
    this.router.navigateByUrl(url);
  }

  scroll = (): void => {
    if (window.pageYOffset > this.sticky) {
      this.header.classList.add('sticky');
    } else {
      this.header.classList.remove('sticky');
    }
  };

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('headermenu-center: ' + this.route.snapshot.paramMap.get('centerId'));
    if (this.route.snapshot.paramMap.get('centerId') == null) {
    } else {
      HeaderMenuComponent.centerId = +this.route.snapshot.paramMap.get('centerId');
    }
    if (HeaderMenuComponent.centerId == null || isNaN(HeaderMenuComponent.centerId)) {
      //redirect error
    } else {
      HeaderMenuComponent.currentUrl = this.router.url;
      // this.urlName = this.getUrl();
      // console.log(this.urlName);
      this.header = document.getElementById('myHeader');
      this.sticky = this.header.offsetTop;
      window.addEventListener('scroll', this.scroll, true);
      this.getCenterById();
    }
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  // getUrl(): string {
  //   if (this.currentUrl.toLowerCase().includes('homepage')) {
  //     return 'homepage';
  //   } else if (this.currentUrl.toLowerCase().includes('programs')) {
  //     return 'programs';
  //   } else if (this.currentUrl.toLowerCase().includes('courses')) {
  //     return 'courses';
  //   } else if (this.currentUrl.toLowerCase().includes('program-detail')) {
  //     return 'programs';
  //   } else if (this.currentUrl.toLowerCase().includes('course-detail')) {
  //     return 'courses';
  //   } else if (this.currentUrl.toLowerCase().includes('enroll')) {
  //     return 'courses';
  //   } else {
  //     return '';
  //   }
  // }

  getCenterById() {
    const body = new HttpParams()
      .set('centerId', HeaderMenuComponent.centerId + '');

    const configUrl = this.apiContext.host + this.apiCustomer.getCenterById;
    this.http.get<string>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        if (res != null && res.length > 0) {
          this.centerName = res;
        }
        console.log(this.centerName);
      },
      error => {
        console.log(error);
      });
  }

  mouseEnterEvent(evt: any) {
    evt.currentTarget.className = evt.currentTarget.className.replace('flipInX', '');
    evt.currentTarget.className += ' pulse';
  }

  mouseLeaveEvent(evt: any) {
    evt.currentTarget.className = evt.currentTarget.className.replace('pulse', '');
  }

}
