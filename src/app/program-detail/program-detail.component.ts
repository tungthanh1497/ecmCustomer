import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css']
})
export class ProgramDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('pId'));
    // if (this.route.snapshot.paramMap.get('pId') == null) {
    // } else {
    //   this.programId = +this.route.snapshot.paramMap.get('pId');
    // }
  }

}
