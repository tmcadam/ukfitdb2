import { PublicationsService } from './publications.service';
import { PersistenceService, StorageType } from 'angular-persistence';

export class MockPersistenceService extends PersistenceService {};

export class MockPublicationsService extends PublicationsService {
    publications;
    loadPublications(): void {
        this.publications = [
            {'title': 'Ornithology Report',
            'authors': 'Furse, J.R., Bruce, G.',
            'year': '1971',
            'keywords':''},
            {'title': 'Birds of the elephant island group',
            'authors': 'Furse, J.R., Bruce, G.',
            'year': '1975',
            'keywords': ''},
            {'title':
            'On the taxonomic value of the intestinal convolutions in birds',
            'authors': 'Gadow, H',
            'year': '1889',
            'keywords': ''},
            {'title': 'The origins of the biota of the Falkland Islands and South Georgia.',
            'authors': 'Buckland, P.C., Hammond, P.M.',
            'year': '1997',
            'keywords': 'Falkland islands, South georgia, Coleoptera, Fossil, Holocene, Refugia, Faunal origins, Charcoal'},
            {'title': 'Mount Pleasant Airport. Falkland Islands: management and planning.',
            'authors': 'Chammings, M.B.',
            'year': '1987',
            'keywords': 'Engineering'}
        ];
        console.log("Using mock publications");
    }
};
