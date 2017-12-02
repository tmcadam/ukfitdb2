import { Component, OnInit } from '@angular/core';
import { PublicationsService } from './publications.service';
import { SearchService } from './search/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    state: string = 'home';

    constructor(private publicationsService: PublicationsService, private searchService: SearchService) { }

    stateUpdate(event: string) {
        this.state = event;
    }

    ngOnInit () {
        this.publicationsService.loadPublications();
    }

    navHome() {
        this.searchService.searchTerm = "";
        this.state = 'home';
    }

    refreshData() {
        this.publicationsService.reloadPublications();
    }
}
