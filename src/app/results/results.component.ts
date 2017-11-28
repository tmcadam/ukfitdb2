import { Component, OnInit, Input } from '@angular/core';
//import { PUBLICATIONS } from '../load-publications';
import * as Papa from "papaparse";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit  {
    @Input()
    state: string;
    publications;

  ngOnInit() {
      Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6MirpSf_ARZD9wrv3PzSiAjWU7JwbmK64j91p_kUi4uter83dLSdzsrX8NwO4Tu28-aMs6s05dfd6/pub?gid=845632468&single=true&output=csv", {
      	download: true,
        header: true,
      	complete: (function(results) {
                this.publications = results.data;
                console.log("Downloading publications finished.");
      	}).bind(this)
      });
      console.log(this);
  }
}
