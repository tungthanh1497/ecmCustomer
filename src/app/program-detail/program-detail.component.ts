import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css']
})
export class ProgramDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private modalService: NgbModal) {
  }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('pId'));
    // if (this.route.snapshot.paramMap.get('pId') == null) {
    // } else {
    //   this.programId = +this.route.snapshot.paramMap.get('pId');
    // }

    // $(document).ready(function() {
    //   $('button').click(function() {
    //     var div = $('div');
    //     div.animate({left: '100px'}, 'slow');
    //     div.animate({fontSize: '5em'}, 'slow');
    //   });
    // });
  }
}

