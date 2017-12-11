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
    public response         :any = {    'text': () => { return MOCK_PUBLICATIONS_CSV},
                                        'status' : 200 }
    public responseTime     :number = 3000
    public progressSteps    :number = 10
    public fileSize         :number = 1000000 // 1 mb
    public intID            :any

    private observable = class MockObservable {
        private toID: any
        constructor ( public superThis: MockProgressHttp ) {}
        unsubscribe() {
            clearInterval(this.superThis.intID)
            clearTimeout(this.toID)
        }
        subscribe(_responseCallbackSuccess:Function, _responseCallbackError:Function): MockObservable {
            this.toID = setTimeout(()=>{
                if ( this.superThis.response.status == 200 ) {
                    _responseCallbackSuccess(this.superThis.response)
                } else {
                    _responseCallbackError(this.superThis.response)
                }
            }, this.superThis.responseTime)
            return this
        }
    }

    withDownloadProgressListener(_progressCallback:Function) {
        // Call progress callbacks in a similar way to the real ProgressHttp
        let x: number = 1
        this.intID = setInterval(() => {
            let progress = {'loaded': (this.fileSize / this.progressSteps) * x }
            _progressCallback(progress)
            x++
            if ( x > this.progressSteps ) { clearInterval(this.intID) }
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
