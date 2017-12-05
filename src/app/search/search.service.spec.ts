import { TestBed }  from '@angular/core/testing';

import { PersistenceService }  from 'angular-persistence';
import { ProgressHttp }        from "angular-progress-http";

import { SearchService } from './search.service';
import { PublicationsService } from '../publications.service';

import { MockPublicationsService, MockPersistenceService, MockProgressHttp } from '../publications.service.mock';

describe('Service: SearchService', () => {
    let service: SearchService;
    let pubs: PublicationsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SearchService,
                { provide: PublicationsService, useClass: MockPublicationsService },
                { provide: PersistenceService, useClass: MockPersistenceService },
                { provide: ProgressHttp, useClass: MockProgressHttp }
            ]
        });
        service = TestBed.get(SearchService);
        pubs = TestBed.get(PublicationsService);
    });

    describe('cleanWord', () => {
        it('should remove no a-zA-Z0-9 characters from a word', () => {
            expect(service.cleanWord("  Hello")).toEqual("Hello");
            expect(service.cleanWord("  Hello  ")).toEqual("Hello");
            expect(service.cleanWord(",1Hello")).toEqual("1Hello");
            expect(service.cleanWord(",$Hello5 ")).toEqual("Hello5");
            expect(service.cleanWord(" Hello World-")).toEqual("Hello World");
        });
    });

    describe('cleanWords', () => {
        let cleanword;
        beforeEach(() => {
            cleanword = spyOn(service, 'cleanWord').and.callThrough();
        });
        it('should call cleanWord on each word in an array', () => {
            const words: string[] = [" Hello", ",Hello", "Hello World"];
            service.cleanWords(words);
            expect(cleanword).toHaveBeenCalledTimes(3);
        });
        it('should clean each word in an array of words using cleanWord', () => {
            const words: string[] = [" Hello", ",Hello", "Hello World"];
            service.cleanWords(words);
            const cleanedWords: string[] = ["Hello", "Hello", "Hello World"];
            expect(service.cleanWords(words)).toEqual(cleanedWords);
        });
    });

    describe('cleanStrippedSearchTerm', () => {
        it('should clean a search term after phrases have been stripped out', () => {
            expect(service.cleanStrippedSearchTerm('Tom "" 1980')).toEqual('Tom 1980');
            expect(service.cleanStrippedSearchTerm('"" Tom 1980')).toEqual('Tom 1980');
        });
    });

    describe('stripPhrasesFromSearchTerm', () => {
        it('should strip phrases from the search term' , () => {
            let phrases: string[] = ["Hello World", "Big seaweed"];
            service.searchTerm = '"Hello World" 1980 "Big seaweed" Tom';
            expect(service.stripPhrasesFromSearchTerm(phrases)).toEqual('1980 Tom');
        });
    });

    describe('getWords', () => {
        it('should return an array words from the searchTerm property', () => {
            service.searchTerm = "blue";
            expect(service.getWords([])).toEqual(["blue"]);
            service.searchTerm = "1980 Tom blue";
            expect(service.getWords([], )).toEqual(["1980", "Tom", "blue"]);
        });
        it('should not return phrases from the searchTerm property', () => {
             service.searchTerm = '"Hello World" 1980 "Goat Grazing" Tom';
             let words = ["Hello World", "Goat Grazing"];
             expect(service.getWords(words)).toEqual([ "Hello World", "Goat Grazing", "1980", "Tom"]);
        });
    });

    describe('getPhrases', () => {
        it('should return an array of speech-marked phrases from the searchTerm', () => {
            service.searchTerm = '"Hello World" "1980 Tom"';
            expect(service.getPhrases([])).toEqual(["Hello World", "1980 Tom"]);
        });
        it('should not return words from the searchTerm', () => {
            service.searchTerm = '"Hello World" 1980 "Goat Grazing" Tom';
            expect(service.getPhrases([])).toEqual(["Hello World", "Goat Grazing"]);
        });
    });

    describe('splitTerm', () => {
        it('should return an array of words and phrases from the search term', () => {
            service.searchTerm = 'big';
            expect(service.splitTerm()).toEqual(["big"]);
            service.searchTerm = 'big seaweed';
            expect(service.splitTerm()).toEqual(["big", "seaweed"]);
            service.searchTerm = '"big seaweed"';
            expect(service.splitTerm()).toEqual(["big seaweed"]);
            service.searchTerm = '"big seaweed" "small seaweed"';
            expect(service.splitTerm()).toEqual(["big seaweed", "small seaweed"]);
            service.searchTerm = '"big seaweed" " small seaweed" 1980';
            expect(service.splitTerm()).toEqual(["big seaweed", "small seaweed", "1980"]);
        });
    });

    describe('matchPublication', () => {
        it('it should return true if the search term is in one of the publication fields', () => {
            let publication = {'title': 'Whitegrass', 'authors': 'Blow, J', 'year': '1980', 'keywords': 'grass,seaweed'};
            expect(service.matchPublication(["white"], publication)).toBeTruthy();
            expect(service.matchPublication(["grass"], publication)).toBeTruthy();
            expect(service.matchPublication(["1980"], publication)).toBeTruthy();
        });
        it('should return false if the search term is not in one of the publication fields', () => {
            let publication = {'title': 'Whitegrass', 'authors': 'Blow, J', 'year': '1980', 'keywords': 'grass,seaweed'};
            expect(service.matchPublication(["rass"], publication)).not.toBeTruthy();
            expect(service.matchPublication(["1972"], publication)).not.toBeTruthy();
            expect(service.matchPublication(["oil"], publication)).not.toBeTruthy();
        });
    });

    describe('search', () => {
        let log;
        beforeEach(() => {
            log = spyOn(console, 'log');
        });
        it('should set results to an array of publications that match the specified searchTerm', () => {
            pubs.loadPublications();
            service.searchTerm = 'Chammings';
            service.search();
            expect(service.results.length).toEqual(1);
            service.searchTerm = '"Furse, J.R."';
            service.search();
            expect(service.results.length).toEqual(2);
            service.searchTerm = '"Furse, J.R." 1975';
            service.search();
            expect(service.results.length).toEqual(1);
            service.searchTerm = 'Coleoptera';
            service.search();
            expect(service.results.length).toEqual(1);
            service.searchTerm = 'Birds';
            service.search();
            expect(service.results.length).toEqual(2);
            service.searchTerm = '"Falkland Islands"';
            service.search();
            expect(service.results.length).toEqual(2);
            service.searchTerm = 'bannanas';
            service.search();
            expect(service.results.length).toEqual(0);
        });
        it('should set results to an empty array if searchTerm is empty', () => {
            pubs.loadPublications();
            service.searchTerm = '';
            service.search();
            expect(service.results.length).toEqual(0);
        });
        it('should log the searchTerm and number of results to the console', () => {
            pubs.loadPublications();
            service.searchTerm = '"Furse, J.R." 1975';
            service.search();
            expect(log).toHaveBeenCalledWith('Search Term:"Furse, J.R." 1975 Found:1');
        });
    });
});
