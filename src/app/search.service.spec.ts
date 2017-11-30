import { SearchService } from './search.service';
import { PublicationsService } from './publications.service';
import { PersistenceService } from 'angular-persistence';

describe('Service: SearchService', () => {
    let service: SearchService;

    beforeEach(() => {
        service = new SearchService(new PublicationsService(new PersistenceService()));
    });

    it('should return an array of words and phrases from the search term', () => {
        var searchTerm: string;
        searchTerm = 'big';
        expect(service.splitTerms(searchTerm).length).toEqual(1);
        searchTerm = 'big seaweed';
        expect(service.splitTerms(searchTerm).length).toEqual(2);
        searchTerm = '"big seaweed"';
        expect(service.splitTerms(searchTerm).length).toEqual(1);
        searchTerm = '"big seaweed" "small seaweed"';
        expect(service.splitTerms(searchTerm).length).toEqual(2);
        searchTerm = '"big seaweed" " small seaweed" 1980';
        var terms = service.splitTerms(searchTerm)
        expect(terms.length).toEqual(3);
        expect(terms[1]).toEqual("small seaweed");
    });

});
