import { SearchService } from './search.service';
import { MockPublicationsService, MockPersistenceService } from './publications.service.mock';

describe('Service: SearchService', () => {
    let service: SearchService;
    let publicationsService: MockPublicationsService;

    beforeEach(() => {
        publicationsService = new MockPublicationsService(new MockPersistenceService);
        publicationsService.loadPublications();
        service = new SearchService(publicationsService);
    });

    it('should remove unwanted characters from a word or phrase using cleanWord', () => {
        expect(service.cleanWord("  Hello")).toEqual("Hello");
        expect(service.cleanWord("  Hello  ")).toEqual("Hello");
        expect(service.cleanWord(",1Hello")).toEqual("1Hello");
        expect(service.cleanWord(",$Hello5 ")).toEqual("Hello5");
        expect(service.cleanWord(" Hello World-")).toEqual("Hello World");
    });

    it('should clean an array of words and phrases using cleanWords', () => {
        const words: string[] = [" Hello", ",Hello", "Hello World"];
        const cleanedWords: string[] = ["Hello", "Hello", "Hello World"];
        expect(service.cleanWords(words)).toEqual(cleanedWords);
    });

    it('should clean a stripped search term using cleanStrippedSearchTerm', () => {
        expect(service.cleanStrippedSearchTerm('Tom "" 1980')).toEqual('Tom 1980');
        expect(service.cleanStrippedSearchTerm('"" Tom 1980')).toEqual('Tom 1980');
    });

    it('should strip phrases from the search term using stripPhrasesFromSearchTerm' , () => {
        let words: string[] = ["Hello World"];
        service.searchTerm = '"Hello World" 1980 Tom';
        expect(service.stripPhrasesFromSearchTerm(words)).toEqual('1980 Tom');
        service.searchTerm = '1980 "Hello World" Tom';
        expect(service.stripPhrasesFromSearchTerm(words)).toEqual('1980 Tom');
    });

    it('should return and array from getWords, of words from the search term', () => {
        expect(service.getWords([], "blue")).toEqual(["blue"]);
        expect(service.getWords([], "1980 Tom blue")).toEqual(["1980", "Tom", "blue"]);
    });

    it('should return an array from getPhrases, of phrases from the search term', () => {
        service.searchTerm = '"Hello World" 1980 Tom';
        expect(service.getPhrases([])).toEqual(["Hello World"]);
        service.searchTerm = '"Hello World" 1980 "Goat Grazing" Tom';
        expect(service.getPhrases([])).toEqual(["Hello World", "Goat Grazing"]);
    });

    it('should return an array from splitTerm, words and phrases from the search term', () => {
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

    it('it should return true from matchPublication if the search term is in the publication', () => {
        let publication = {'title': 'Whitegrass', 'authors': 'Blow, J', 'year': '1980', 'keywords': 'grass,seaweed'};
        expect(service.matchPublication(["white"], publication)).toBeTruthy();
        expect(service.matchPublication(["grass"], publication)).toBeTruthy();
        expect(service.matchPublication(["1980"], publication)).toBeTruthy();
    });

    it('should return false from matchPublication if the search term is not in the publication', () => {
        let publication = {'title': 'Whitegrass', 'authors': 'Blow, J', 'year': '1980', 'keywords': 'grass,seaweed'};
        expect(service.matchPublication(["rass"], publication)).not.toBeTruthy();
        expect(service.matchPublication(["1972"], publication)).not.toBeTruthy();
        expect(service.matchPublication(["oil"], publication)).not.toBeTruthy();
    });

    it('should return expected publications for a search term from search method', () => {
        service.search('Chammings');
        expect(service.results.length).toEqual(1);
        service.search('"Furse, J.R."');
        expect(service.results.length).toEqual(2);
        service.search('"Furse, J.R." 1975');
        expect(service.results.length).toEqual(1);
        service.search('Coleoptera');
        expect(service.results.length).toEqual(1);
        service.search('Birds');
        expect(service.results.length).toEqual(2);
        service.search('"Falkland Islands"');
        expect(service.results.length).toEqual(2);
        service.search('bannanas');
        expect(service.results.length).toEqual(0);
    });

});
