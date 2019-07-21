import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

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

  urlName: string;
  currentUrl: string;
  header: any;
  sticky: any;

  scroll = (): void => {
    if (window.pageYOffset > this.sticky) {
      this.header.classList.add('sticky');
    } else {
      this.header.classList.remove('sticky');
    }
  };

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.urlName = this.getUrl();
    console.log(this.urlName);
    this.header = document.getElementById('myHeader');
    this.sticky = this.header.offsetTop;
    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  getUrl(): string {
    if (this.currentUrl.toLowerCase().includes('homepage')) {
      return 'homepage';
    } else if (this.currentUrl.toLowerCase().includes('programs')) {
      return 'programs';
    } else if (this.currentUrl.toLowerCase().includes('courses')) {
      return 'courses';
    } else if (this.currentUrl.toLowerCase().includes('program-detail')) {
      return 'programs';
    } else if (this.currentUrl.toLowerCase().includes('course-detail')) {
      return 'courses';
    } else if (this.currentUrl.toLowerCase().includes('enroll')) {
      return 'courses';
    } else {
      return '';
    }
  }


  mouseEnterEvent(evt: any) {
    evt.currentTarget.className = evt.currentTarget.className.replace('flipInX', '');
    evt.currentTarget.className += ' pulse';
  }

  mouseLeaveEvent(evt: any) {
    evt.currentTarget.className = evt.currentTarget.className.replace('pulse', '');
  }

}
