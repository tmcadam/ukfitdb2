import { StorageType }          from 'angular-persistence'

import { Publication }          from './publication'
import { MOCK_PUBLICATIONS,
    MOCK_PUBLICATIONS_CSV }     from './publications.mock'


export class MockPersistenceService {
    data: any = {}
    set( name: string, _data: any, type: any ) {
        this.data[name] = _data
    }
    get( name: string, type: StorageType ){
        if(this.data.hasOwnProperty(name)) {
            return this.data[name]
        }
        return null
    }
}

export class MockProgressHttp {
    public response: any
    public responseTime: number = 3000
    public progressSteps: number = 10
    public fileSize: number = 1000000 // 1 mb

    private observable = class MockObservable {
        constructor ( public superThis: MockProgressHttp ) {}
        subscribe(_responseCallback:Function) {
            setTimeout(()=>{
                _responseCallback(this.superThis.response)
            }, this.superThis.responseTime)
        }
    }

    withDownloadProgressListener(_progressCallback:Function) {
        // Call progress callbacks in a similar way to the real ProgressHttp
        let x: number = 1
        let intID = setInterval(() => {
            let progress = {'loaded': (this.fileSize / this.progressSteps) * x }
            _progressCallback(progress)
            x++
            if ( x > this.progressSteps ) { clearInterval(intID) }
        }, this.responseTime / this.progressSteps )
        // Return an Http-esque object with 'get', that returns an observable
        // that responds with a set reponse after a set time
        return {'get': () => { return new this.observable(this) }}
    }
}

export class MockPublicationsService {
    loadingStatus: boolean = false
    loadingProgress: string = '0%'
    publications: Publication[]
    loadPublications(): void {
        console.log("Loaded mock publications.")
        this.publications = MOCK_PUBLICATIONS
    }
    reloadPublications(): void{}
}
