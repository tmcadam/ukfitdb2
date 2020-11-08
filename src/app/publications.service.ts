import { Injectable }   from '@angular/core'
import {Observable}     from 'rxjs/Observable'

import * as Papa                            from "papaparse"
import { PersistenceService, StorageType }  from 'angular-persistence'
import { ProgressHttp }                     from "angular-progress-http"
import { ResponseContentType }              from '@angular/http'

import { Publication }      from './publication'

@Injectable()
export class PublicationsService {
    publications        :Publication[]
    loadingStatus       :boolean = false
    loadingProgress     :string = '0%'
    public timeout      :any
    public request      :any

    readonly loadingTotal: number = 600000
    readonly sheetUrl: string = "/assets/publications.csv"

    constructor(private persistenceService: PersistenceService, public http: ProgressHttp) {}

    cleanYears(): void {
        for (let pub of this.publications) {
            if (pub.year == '0') {
                pub.year = '-'
            }
        }
    }

    handleDownload(response): void {
        this.parseCSV(response.text())
        this.cleanYears()
        this.persistenceService.set('fitPublications', this.publications, {type: StorageType.SESSION})
        this.downloadCleanup()
    }

    handleFailedDownload(response): void {
        console.log(`Error: download failed with code ${response.status}.`)
        this.downloadCleanup()
    }

    downloadCleanup(): void {
        clearTimeout(this.timeout)
        setTimeout( () => {
            this.loadingStatus = false
            this.loadingProgress = '0%'
        }, 500)
    }

    reloadPublications(): void {
        console.log("Reloading data from sheets.")
        this.loadFromSheets()
    }

    parseCSV(csvData: string): void {
        let results = Papa.parse(csvData, { header: true })
        this.publications = results.data
        console.log("Parsed publications.")
    }

    updateProgress(progress): void {
        this.loadingProgress = `${(progress.loaded/this.loadingTotal) * 100}%`
        console.log(`Downloading ${this.loadingProgress}`)
     }

    loadPublications(): void {
        this.publications = this.persistenceService.get( 'fitPublications', StorageType.SESSION )
        if (!this.publications) {
            console.log("Loading data from sheets.")
            this.loadFromSheets()
        } else {
            console.log("Using cached publications data.")
        }
    }

    loadFromSheets(): void {
        this.loadingStatus = true
        this.timeout = setTimeout(() => {
            this.request.unsubscribe()
            this.handleFailedDownload({'status': 501})
        }, 120000)
        this.request = this.http
            .withDownloadProgressListener((progress) => { this.updateProgress(progress) })
                .get( this.sheetUrl, { responseType: ResponseContentType.Text })
                    .subscribe (
                        (response) => { this.handleDownload(response) },
                        (response) => { this.handleFailedDownload(response) }
                )
    }
}
