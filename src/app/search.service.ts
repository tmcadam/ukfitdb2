import { Injectable } from '@angular/core';
import { PublicationsService } from './publications.service';

@Injectable()
export class SearchService {
    results = [];
    constructor(private publicationsService: PublicationsService) { }

    matchPubs(searchTerm, publication) {
        var re = new RegExp(searchTerm, 'i');
        var result: boolean;
        ( publication.title.search(re) >= 0 ) ? result = true : result = false;
        return result;
    }

    search(_searchTerm: string) {
        this.results = this.publicationsService.publications.filter(this.matchPubs.bind(null, _searchTerm));
        console.log("Search Term:" + _searchTerm + " Found:" + this.results.length);
    }

}
