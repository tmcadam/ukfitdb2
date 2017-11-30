import { Injectable } from '@angular/core';
import { PublicationsService } from './publications.service';

@Injectable()
export class SearchService {
    results = [];
    constructor(private publicationsService: PublicationsService) { }

    splitTerms(_searchTerm) {
        let words: string[] = [];
        let matches, re: RegExp;
        // Look for phrases
        re = new RegExp("\"([^\"]*)\"", 'g');
        while ((matches = re.exec(_searchTerm)) != null) {
            words.push(matches[1]);
        }
        // Clean the phrases from _searchTerm
        words.forEach(function (word) {
             _searchTerm = _searchTerm.replace(word, "");
        });
        // Look for words
        re = new RegExp('\\w+', 'g');
        if ((matches = _searchTerm.match(re)) != null) {
            words = words.concat(matches);
        }
        // Clean all the phrases
        words.map(function(word, i, ar){
            ar[i] = word.replace(/(^\W+)|(\W+$)/g, "");
        });
        return words;
    }

    matchPubs(searchTerms, publication) {
        let overallResult: boolean = true;
        searchTerms.forEach(function (term) {
            let re = new RegExp('\\b' + term, 'i');
            let wordResult: boolean = false;
            if ( publication.title.search(re) >= 0 ) { wordResult = true };
            if ( publication.keywords.search(re) >= 0 ) { wordResult = true };
            if ( publication.authors.search(re) >= 0 ) { wordResult = true };
            if ( publication.year.search(re) >= 0 ) { wordResult = true };
            if (!wordResult) { overallResult = false};
        });
        return overallResult;
    }

    search(_searchTerm: string) {
        let searchTerms = this.splitTerms(_searchTerm);
        this.results = this.publicationsService.publications.filter(this.matchPubs.bind(null, searchTerms));

        console.log("Search Term:" + _searchTerm + " Found:" + this.results.length);
    }

}
