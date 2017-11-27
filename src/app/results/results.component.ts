import { Component, OnInit } from '@angular/core';
import { PUBLICATIONS } from '../load-publications';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  publications = PUBLICATIONS;

}
