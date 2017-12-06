import { Component,AfterViewInit,
            ViewChild, OnInit, ElementRef } from '@angular/core'

import { PublicationsService }  from './publications.service'
import { SearchService }        from './search/search.service'
import { StateService , Display }         from './state.service'

declare var $ :any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

    constructor(    public pubs: PublicationsService,
                    private searchService: SearchService,
                    public stateService: StateService
                ) { }

    ngOnInit () {
        this.pubs.loadPublications()
    }

    // Can't test as the preload div doesn't exist in Angular
    hidePreload() {
        $('div.preload').hide()
    }

    ngAfterViewInit() {
        setTimeout( () => {
            this.hidePreload()
        }, 1000)
    }

    navHome() {
        this.searchService.searchTerm = ""
        this.stateService.state = Display.HOME
    }

    refreshData() {
        this.pubs.reloadPublications()
    }
}
