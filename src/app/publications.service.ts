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

    constructor(private persistenceService: PersistenceService, private http: ProgressHttp) {}

    reloadPublications(): void {
        console.log("Reloading data from sheets.");
        this.loadFromSheets();
    }

    loadFromSheets(): void {
        this.loadingStatus = true;
        this.http
            .withDownloadProgressListener(progress => {
                this.loadingProgress = `${(progress.loaded/this.loadingTotal) * 100}%`;
                console.log(`Downloading ${this.loadingProgress}`);
             })
            .get(this.sheetUrl, {responseType: ResponseContentType.Text} )
            .subscribe((response) => {
                console.log("Downloaded publications.");
                Papa.parse(response.text(), {
                    header: true,
                    complete: (results => {
                          console.log("Parsed publications.");
                          this.publications = results.data;
                          this.persistenceService.set('fitPublications', this.publications, {type: StorageType.SESSION});
                          setTimeout( () => {
                              this.loadingStatus = false;
                              this.loadingProgress = '0%';
                            }, 500)
                    })
                });
        });
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
}
