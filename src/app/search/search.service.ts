import { Injectable } from '@angular/core';
import { PublicationsService } from '../publications.service';
import { Publication } from '../publication';

@Injectable()
export class SearchService {
    results: Publication[];
    searchTerm: string;

    constructor(private pubs: PublicationsService) {}

    cleanWord(_word: string) {
        return _word.replace(/(^\W+)|(\W+$)/g, "");
    }

    cleanWords(_words: string[]) {
        _words.map( function( word, i, ar ) {
            ar[i] = this.cleanWord(word);
        }, this);
        return _words;
    }

    cleanStrippedSearchTerm(_searchTerm: string) {
        _searchTerm = _searchTerm.replace(/\"/g, '');
        _searchTerm = _searchTerm.replace(/  /g, ' ');
        _searchTerm = this.cleanWord(_searchTerm);
        return _searchTerm;
    };

    stripPhrasesFromSearchTerm(_words: string[]) {
        let strippedSearchTerm: string = this.searchTerm;
        _words.forEach(function (word) {
             strippedSearchTerm = strippedSearchTerm.replace(word, "");
        });
        return this.cleanStrippedSearchTerm(strippedSearchTerm);
    }

    getPhrases(_words: string[]) {
        let matches, re: RegExp;
        re = new RegExp("\"([^\"]*)\"", 'g');
        while ((matches = re.exec(this.searchTerm)) != null) {
            _words.push(matches[1]);
        }
        return _words;
    }

    getWords (_words: string[], _strippedSearchTerm: string) {
        let matches, re: RegExp;
        re = new RegExp('\\w+', 'g');
        if ((matches = _strippedSearchTerm.match(re)) != null) {
            _words = _words.concat(matches);
        }
        return _words;
    }

    splitTerm() {
        let words: string[] = [];
        words = this.getPhrases(words);
        words = this.getWords(words, this.stripPhrasesFromSearchTerm(words));
        words = this.cleanWords(words);
        return words;
    }

    matchPublication(searchWords: string[], publication: any) {
        let overallResult: boolean = true;
        searchWords.forEach(function (word) {
            let re = new RegExp('\\b' + word, 'i');
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
        this.searchTerm = _searchTerm;
        let searchWords = this.splitTerm();
        this.results = this.pubs.publications.filter(this.matchPublication.bind(null, searchWords));

        console.log("Search Term:" + _searchTerm + " Found:" + this.results.length);
    }

}
