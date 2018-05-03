import { Component, Output, Input, EventEmitter }   from '@angular/core'

import { SearchService }        from './search.service'
import { PublicationsService }  from '../publications.service'
import { StateService, Display }         from '../state.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

    constructor(public searchService: SearchService,
                public pubs: PublicationsService,
                public stateService: StateService) {}

    search () {
        this.searchService.search()
        this.stateService.state = Display.RESULTS
    }
}
