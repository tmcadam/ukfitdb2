import { Component, Output, EventEmitter } from '@angular/core';

import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

    @Output() stateUpdate = new EventEmitter<string>();
    constructor(public searchService: SearchService) {}

    search () {
        this.searchService.search();
        this.stateUpdate.emit('results');
    }
}
