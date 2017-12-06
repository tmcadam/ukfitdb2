import { TestBed, fakeAsync, tick }  from '@angular/core/testing';

import { PersistenceService, StorageType }  from 'angular-persistence';
import { ProgressHttp }                     from "angular-progress-http";

import { PublicationsService } from './publications.service';

import { MockPersistenceService, MockProgressHttp } from './publications.service.mock';
import { MOCK_PUBLICATIONS , MOCK_PUBLICATIONS_CSV} from './mock.publications';

fdescribe('Publications: PublicationsService', () => {
    let service: PublicationsService;
    let persistenceService: MockPersistenceService;
    let progressService: MockProgressHttp;
    let log;
    let loadFromSheets;
    let parseCSV;
    let set;
    let withDownloadProgressListener;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PublicationsService,
                { provide: PersistenceService, useClass: MockPersistenceService },
                { provide: ProgressHttp, useClass: MockProgressHttp }
            ]
        });
        service = TestBed.get(PublicationsService);
        persistenceService = TestBed.get(PersistenceService);
        progressService = TestBed.get(ProgressHttp);
        log = spyOn(console, 'log');
        loadFromSheets = spyOn(service, 'loadFromSheets').and.callThrough();
        parseCSV = spyOn(service, 'parseCSV').and.callThrough();
        set = spyOn(persistenceService, 'set').and.callThrough();
        withDownloadProgressListener = spyOn(progressService, 'withDownloadProgressListener').and.callThrough();
    });

    describe('loadFromSheets', () => {
        beforeEach(() => {
            service.loadFromSheets();
        });
        it('should set loadingStatus to true', () => {
            expect(service.loadingStatus).toBeTruthy();
        });
        it('should call withDownloadProgressListener', () => {
            expect(withDownloadProgressListener).toHaveBeenCalled();
        });
    });

    fdescribe('handleDownload', () => {
        let response: any;
        beforeEach(() => {
            response = {'text': () => { return "some,response,text";} }
        });
        it('should call parseCSV with the data contained in response', () => {
            service.handleDownload(response);
            expect(parseCSV).toHaveBeenCalledWith("some,response,text");
        });
        it('should call set in the persistenceService to cache to the publications data', () => {
            service.handleDownload(response);
            expect(set).toHaveBeenCalledWith('fitPublications', service.publications, {type: StorageType.SESSION});
        });
        it('should set the loadingStatus to false and loadingProgress to 0% after 500ms delay', <any>fakeAsync(() => {
            service.loadingProgress = '25%';
            service.loadingStatus = true;
            service.handleDownload(response);
            expect(service.loadingProgress).toEqual('25%');
            expect(service.loadingStatus).toEqual(true);
            tick(250);
            expect(service.loadingProgress).toEqual('25%');
            expect(service.loadingStatus).toEqual(true);
            tick(510);
            expect(service.loadingProgress).toEqual('0%');
            expect(service.loadingStatus).toEqual(false);
        }));
    });

    describe('reloadPublications', () => {
        beforeEach(() => {
            service.reloadPublications();
        });
        it('should call loadFromSheets', () => {
            expect(loadFromSheets).toHaveBeenCalled();
        });
        it('and should output to the console', () => {
            expect(log).toHaveBeenCalledWith("Reloading data from sheets.");
        });
    });

    describe('loadPublications', () => {
        describe('when publications data exists in the browser cache', () => {
            beforeEach(() => {
                persistenceService.set( 'fitPublications', MOCK_PUBLICATIONS, StorageType.SESSION );
                service.loadPublications();
            });
            it('should set the publications property with data from browser cache', () => {
                expect(service.publications).toEqual(MOCK_PUBLICATIONS);
            });
            it('should not call loadFromSheets', () => {
                expect(loadFromSheets).not.toHaveBeenCalled();
            });
            it('should output to the console', () => {
                expect(log).toHaveBeenCalledWith("Using cached publications data.");
            });
        });
        describe('when publications data does not exist in the browser cache', () => {
            beforeEach(() => {
                service.loadPublications();
            });
            it('should call loadSheets', () => {
                expect(loadFromSheets).toHaveBeenCalled();
            });
            it('should output to the console', () => {
                expect(log).toHaveBeenCalledWith("Loading data from sheets.");
            });
        });
    });

    describe('parseCSV', () => {
        beforeEach(() => {
            service.parseCSV(MOCK_PUBLICATIONS_CSV);
        });
        it('should parse a CSV string to a JSON object and set this to the publicatons property', () => {
            expect(service.publications.length).toEqual(5);
            expect(service.publications[0].id).toEqual('2725');
            expect(service.publications[2].year).toEqual('1889');
            expect(service.publications[4].title).toEqual('Mount Pleasant Airport. Falkland Islands: management and planning.');
        });
        it('should output to the console', () => {
            expect(log).toHaveBeenCalledWith("Parsed publications.");
        });
    });

    describe('updateProgress', () => {
        let progressEvent;
        it('should set loadingProgress property with a CSS-compatiable string of percentage', () => {
            progressEvent = {'loaded': service.loadingTotal / 2 };
            service.updateProgress(progressEvent);
            expect(service.loadingProgress).toEqual('50%');
            progressEvent = {'loaded': service.loadingTotal / 3 };
            service.updateProgress(progressEvent);
            expect(service.loadingProgress).toContain('33.3');
            expect(service.loadingProgress).toContain('%');
        })
        it('output loadingProgress property to the console ', ()=> {
            progressEvent = {'loaded': service.loadingTotal / 4 };
            service.updateProgress(progressEvent);
            expect(log).toHaveBeenCalledWith(`Downloading 25%`);
        });
    });
});
