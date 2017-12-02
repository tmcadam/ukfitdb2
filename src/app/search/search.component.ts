import { Component, Output, EventEmitter } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
    @Output() stateUpdate = new EventEmitter<string>();
    constructor(private searchService: SearchService) { }

    search (searchTerm: string) {
        this.searchService.search(searchTerm);
        this.stateUpdate.emit('results');
    }
}
