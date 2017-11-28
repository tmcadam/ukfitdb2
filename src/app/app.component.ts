import { Component, OnInit } from '@angular/core';
import { PublicationsService } from './publications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    state: string = 'home';
    results;

    constructor(private publicationsService: PublicationsService) { }

    stateUpdate(event: string) {
        this.state = event;
    }

    ngOnInit () {
        this.results = this.publicationsService.loadPublications();
    }
}
