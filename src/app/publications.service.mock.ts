import { Publication }          from './publication';
import { MOCK_PUBLICATIONS }    from './mock.publications';

export class MockPersistenceService {};
export class MockProgressHttp {};

export class MockPublicationsService {
    loadingStatus: boolean = false;
    loadingProgress: string = '0%';
    publications: Publication[];
    loadPublications(): void {
        console.log("Loaded mock publications.");
        this.publications = MOCK_PUBLICATIONS;
    }
};
