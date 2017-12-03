import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { PublicationsService } from './publications.service';
import { SearchService } from './search/search.service';
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    state: string = 'home';
    @ViewChild('#preload') preloadDiv:ElementRef;
    constructor(public pubs: PublicationsService, private searchService: SearchService) { }

    stateUpdate(event: string) {
        this.state = event;
    }

    ngOnInit () {
        this.pubs.loadPublications();
    }

    ngAfterViewInit() {
        setTimeout( () => {
            $('#preload').hide();
        }, 1000)
    }

    navHome() {
        this.searchService.searchTerm = "";
        this.state = 'home';
    }

    refreshData() {
        this.pubs.reloadPublications();
    }
}
