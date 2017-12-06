import { Injectable }   from '@angular/core';
import {Observable}     from 'rxjs/Observable';

import * as Papa                            from "papaparse";
import { PersistenceService, StorageType }  from 'angular-persistence';
import { ProgressHttp }                     from "angular-progress-http";
import { ResponseContentType }              from '@angular/http';

import { Publication }  from './publication';

@Injectable()
export class PublicationsService {
    publications: Publication[];
    loadingStatus: boolean = false;
    loadingProgress: string = '0%';
    readonly loadingTotal: number = 600000;
    readonly sheetUrl: string = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6MirpSf_ARZD9wrv3PzSiAjWU7JwbmK64j91p_kUi4uter83dLSdzsrX8NwO4Tu28-aMs6s05dfd6/pub?gid=845632468&single=true&output=csv";

    constructor(private persistenceService: PersistenceService, public http: ProgressHttp) {}

    handleDownload(response): void {
        this.parseCSV(response.text());
        this.persistenceService.set('fitPublications', this.publications, {type: StorageType.SESSION});
        setTimeout( () => {
            this.loadingStatus = false;
            this.loadingProgress = '0%';
        }, 500)
    }

    reloadPublications(): void {
        console.log("Reloading data from sheets.");
        this.loadFromSheets();
    }

    parseCSV(csvData: string): void {
        let results = Papa.parse(csvData, { header: true });
        this.publications = results.data;
        console.log("Parsed publications.");
    }

    updateProgress(progress): void {
        this.loadingProgress = `${(progress.loaded/this.loadingTotal) * 100}%`;
        console.log(`Downloading ${this.loadingProgress}`);
     }

    loadPublications(): void {
        this.publications = this.persistenceService.get( 'fitPublications', StorageType.SESSION );
        if (!this.publications) {
            console.log("Loading data from sheets.");
            this.loadFromSheets();
        } else {
            console.log("Using cached publications data.");
        }
    }

    loadFromSheets(): void {
        this.loadingStatus = true
        this.http
            .withDownloadProgressListener((progress) => { this.updateProgress(progress) })
                .get( this.sheetUrl, { responseType: ResponseContentType.Text })
                    .subscribe((response) => { this.handleDownload(response) })
    }
}
