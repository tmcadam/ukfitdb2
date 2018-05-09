import { TestBed, fakeAsync, async, tick }  from '@angular/core/testing'

import { PersistenceService, StorageType }  from 'angular-persistence'
import { ProgressHttp }                     from "angular-progress-http"

import { PublicationsService } from './publications.service'

import { MockPersistenceService, MockProgressHttp } from './publications.service.mock'
import { MOCK_PUBLICATIONS , MOCK_PUBLICATIONS_CSV} from './publications.mock'

describe('Publications: PublicationsService', () => {
    let service             :PublicationsService
    let persistenceService  :MockPersistenceService
    let progressService     :MockProgressHttp
    let log

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PublicationsService,
                { provide: ProgressHttp, useClass: MockProgressHttp },
                { provide: PersistenceService, useClass: MockPersistenceService }
            ]
        })
        service = TestBed.get(PublicationsService)
        persistenceService = TestBed.get(PersistenceService)
        progressService = TestBed.get(ProgressHttp)
        log = spyOn(console, 'log')
    })

    describe('loadFromSheets', () => {

        it('should set loadingStatus to true', fakeAsync(() => {
            service.loadFromSheets()
            expect(service.loadingStatus).toBeTruthy()
            tick(125000)
        }))
        it('should call withDownloadProgressListener', fakeAsync(() => {
            let withDownloadProgressListener = spyOn(progressService, 'withDownloadProgressListener').and.callThrough()
            service.loadFromSheets()
            expect(withDownloadProgressListener).toHaveBeenCalled()
            tick(125000)
        }))
        it('should call handleDownload if successful', fakeAsync(() => {
            let handleDownload = spyOn( service, 'handleDownload' )
            service.loadFromSheets()
            tick(3010)
            expect(handleDownload).toHaveBeenCalled()
            tick(125000)
        }))
        it('should call handleFailedDownload if not successful', fakeAsync(() => {
            let handleFailedDownload = spyOn( service, 'handleFailedDownload' )
            progressService.responseTime = 100
            progressService.response = {
                'text': () => { return null },
                'status' : 404
            }
            service.loadFromSheets()
            tick(110)
            expect(handleFailedDownload).toHaveBeenCalled()
            tick(125000)
        }))
        it('should call handleFailedDownload and cancel http if time exceeds 120000', fakeAsync(() => {
            let handleFailedDownload = spyOn( service, 'handleFailedDownload' )
            progressService.responseTime = 180000
            service.loadFromSheets()
            let unsubscribe = spyOn(service.request, 'unsubscribe').and.callThrough()
            tick(120100)
            expect(unsubscribe).toHaveBeenCalled()
            expect(handleFailedDownload).toHaveBeenCalledWith({'status':501})
        }))
        it('should call updateProgess during download', fakeAsync(() => {
            progressService.fileSize = service.loadingTotal
            let updateProgress = spyOn(service, 'updateProgress').and.callThrough()
            service.loadFromSheets()
            tick(1510)
            expect(updateProgress).toHaveBeenCalledTimes(5)
            tick(1500)
            expect(updateProgress).toHaveBeenCalledTimes(10)
            tick(500) // to allow the delayed UI updates
        }))
    })

    describe('handleFailedDownload', () => {
        let response: any
        beforeEach(() => {
            response = {'text': () => { return "some,response,text" },
                        'status': 404 }
        })
        it('and should output to the console', fakeAsync(() => {
            service.handleFailedDownload(response)
            expect(log).toHaveBeenCalledWith(`Error: download failed with code 404.`)
            tick(500)
        }))
        it('should call downloadCleanup', fakeAsync(() => {
            let downloadCleanup = spyOn(service, 'downloadCleanup').and.callThrough()
            service.handleFailedDownload(response)
            expect(downloadCleanup).toHaveBeenCalled()
            tick(500)
        }))
    })

    describe('handleDownload', () => {
        let response: any
        beforeEach(() => {
            response = {'text': () => { return "some,response,text"} }
        })
        it('should call parseCSV with the data contained in response', fakeAsync(() => {
            let parseCSV = spyOn(service, 'parseCSV').and.callThrough()
            service.handleDownload(response)
            expect(parseCSV).toHaveBeenCalledWith("some,response,text")
            tick(500)
        }))
        it('should call cleanYears', fakeAsync(() => {
            let cleanYears = spyOn(service, 'cleanYears').and.callThrough()
            service.handleDownload(response)
            expect(cleanYears).toHaveBeenCalled()
            tick(500)
        }))
        it('should call set in the persistenceService to cache to the publications data and call download cleanup', () => {
            let set = spyOn(persistenceService, 'set')
            let downloadCleanup = spyOn(service, 'downloadCleanup')
            service.handleDownload(response)
            expect(set).toHaveBeenCalledWith('fitPublications', service.publications, {type: StorageType.SESSION})
            expect(downloadCleanup).toHaveBeenCalled()
        })
    })

    describe('downloadCleanup', () => {
        it('should cancel the http (in case of timeout)', fakeAsync(() => {
            let clearTimeout = spyOn(window, 'clearTimeout').and.callThrough()
            service.downloadCleanup()
            expect(clearTimeout).toHaveBeenCalled()
            tick(500)
        } ))
        it('should set the loadingStatus to false and loadingProgress to 0% after 500ms delay', <any>fakeAsync(() => {
            service.loadingProgress = '25%'
            service.loadingStatus = true
            service.downloadCleanup()
            expect(service.loadingProgress).toEqual('25%')
            expect(service.loadingStatus).toEqual(true)
            tick(250)
            expect(service.loadingProgress).toEqual('25%')
            expect(service.loadingStatus).toEqual(true)
            tick(510)
            expect(service.loadingProgress).toEqual('0%')
            expect(service.loadingStatus).toEqual(false)
        }))
    })

    describe('reloadPublications', () => {
        let loadFromSheets
        beforeEach(() => {
            loadFromSheets = spyOn(service, 'loadFromSheets')
        })
        it('should call loadFromSheets', () => {
            service.reloadPublications()
            expect(loadFromSheets).toHaveBeenCalled()
        })
        it('and should output to the console', () => {
            service.reloadPublications()
            expect(log).toHaveBeenCalledWith("Reloading data from sheets.")
        })
    })

    describe('loadPublications', () => {
        describe('when publications data exists in the browser cache', () => {
            beforeEach(() => {
                persistenceService.set( 'fitPublications', MOCK_PUBLICATIONS, StorageType.SESSION )
            })
            it('should set the publications property with data from browser cache', () => {
                service.loadPublications()
                expect(service.publications).toEqual(MOCK_PUBLICATIONS)
            })
            it('should not call loadFromSheets', () => {
                let loadFromSheets = spyOn(service, 'loadFromSheets').and.callThrough()
                service.loadPublications()
                expect(loadFromSheets).not.toHaveBeenCalled()
            })
            it('should output to the console', () => {
                service.loadPublications()
                expect(log).toHaveBeenCalledWith("Using cached publications data.")
            })
        })
        describe('when publications data does not exist in the browser cache', () => {
            let loadFromSheets
            beforeEach(() => {
                loadFromSheets = spyOn(service, 'loadFromSheets')
            })
            it('should call loadSheets', () => {
                service.loadPublications()
                expect(loadFromSheets).toHaveBeenCalled()
            })
            it('should output to the console', () => {
                service.loadPublications()
                expect(log).toHaveBeenCalledWith("Loading data from sheets.")
            })
        })
    })

    describe('parseCSV', () => {
        beforeEach(() => {
            service.parseCSV(MOCK_PUBLICATIONS_CSV)
        })
        it('should parse a CSV string to a JSON object and set this to the publicatons property', () => {
            expect(service.publications).toEqual(MOCK_PUBLICATIONS)
        })
        it('should output to the console', () => {
            expect(log).toHaveBeenCalledWith("Parsed publications.")
        })
    })

    describe('updateProgress', () => {
        let progressEvent
        it('should set loadingProgress property with a CSS-compatiable string of percentage', () => {
            progressEvent = {'loaded': service.loadingTotal / 2 }
            service.updateProgress(progressEvent)
            expect(service.loadingProgress).toEqual('50%')
            progressEvent = {'loaded': service.loadingTotal / 3 }
            service.updateProgress(progressEvent)
            expect(service.loadingProgress).toContain('33.3')
            expect(service.loadingProgress).toContain('%')
        })
        it('output loadingProgress property to the console ', ()=> {
            progressEvent = {'loaded': service.loadingTotal / 4 }
            service.updateProgress(progressEvent)
            expect(log).toHaveBeenCalledWith(`Downloading 25%`)
        })
    })

    describe('cleanYears', () => {
        it('should remplace any year 0 with a -', () => {
            service.parseCSV(MOCK_PUBLICATIONS_CSV)
            service.publications[0].year = '0'
            expect(service.publications[0].year).toEqual('0')
            service.cleanYears()
            expect(service.publications[0].year).toEqual('-')
        })
    })
})
