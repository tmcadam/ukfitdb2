import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

    @Input() state: string;
    constructor(private search: SearchService) { }

}
