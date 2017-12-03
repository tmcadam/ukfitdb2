import { PublicationsService } from './publications.service';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Publication } from './publication';

export class MockPersistenceService extends PersistenceService {};

export class MockPublicationsService extends PublicationsService {
    loadingStatus: boolean = false;
    loadingProgress: number = 0;
    publications: Publication[];
    loadPublications(): void {
        this.publications = [
            {
            'id': 1,
            'title': 'Ornithology Report',
            'authors': 'Furse, J.R., Bruce, G.',
            'year': '1971',
            'keywords':'',
            'reference': 'Journal of Tom',
            'format': ''},
            {
            'id': 2,
            'title': 'Birds of the elephant island group',
            'authors': 'Furse, J.R., Bruce, G.',
            'year': '1975',
            'keywords': '',
            'reference': 'Journal of Tom',
            'format': ''},
            {
            'id': 3,
            'title':'On the taxonomic value of the intestinal convolutions in birds',
            'authors': 'Gadow, H',
            'year': '1889',
            'keywords': '',
            'reference': 'Journal of Tom',
            'format': ''},
            {
            'id': 4,
            'title': 'The origins of the biota of the Falkland Islands and South Georgia.',
            'authors': 'Buckland, P.C., Hammond, P.M.',
            'year': '1997',
            'keywords': 'Falkland islands, South georgia, Coleoptera, Fossil, Holocene, Refugia, Faunal origins, Charcoal',
            'reference': 'Journal of Tom',
            'format': ''},
            {
            'id': 5,
            'title': 'Mount Pleasant Airport. Falkland Islands: management and planning.',
            'authors': 'Chammings, M.B.',
            'year': '1987',
            'keywords': 'Engineering',
            'reference': 'Journal of Tom',
            'format': ''}
        ];
        console.log("Using mock publications");
    }
};
