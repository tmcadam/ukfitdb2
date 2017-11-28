import { Component, Input, OnInit } from '@angular/core';
import { PublicationsService } from '../publications.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

    @Input() state: string;
    constructor(private publicationsService: PublicationsService) { }
    
}
