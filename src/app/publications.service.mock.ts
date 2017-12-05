import { Publication }          from './publication';
import { MOCK_PUBLICATIONS }    from './mock.publications';

import { StorageType }  from 'angular-persistence';

export class MockPersistenceService {

    data: any = {};

    set( name: string, _data: any, type: any ) {
        this.data[name] = _data;
    }

    get( name: string, type: StorageType ){
        if(this.data.hasOwnProperty(name)) {
            return this.data[name];
        }
        return null;
    }

};

class MockObservable {
    subscribe() {};
}

class MockHttp {
    get () {
        return new MockObservable;
    };
}

export class MockProgressHttp {
    withDownloadProgressListener() {
        return new MockHttp;
    };
};

export class MockPublicationsService {
    loadingStatus: boolean = false;
    loadingProgress: string = '0%';
    publications: Publication[];
    loadPublications(): void {
        console.log("Loaded mock publications.");
        this.publications = MOCK_PUBLICATIONS;
    }
};
