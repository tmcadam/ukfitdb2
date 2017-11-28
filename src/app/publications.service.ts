import { Injectable } from '@angular/core';
import * as Papa from "papaparse";
import { PersistenceService, StorageType } from 'angular-persistence';

@Injectable()
export class PublicationsService {
    publications;

    constructor(private persistenceService: PersistenceService) {}

    loadPublications(): void {
        this.publications = this.persistenceService.get( 'fitPublications', StorageType.SESSION );
        if (!this.publications) {
            Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6MirpSf_ARZD9wrv3PzSiAjWU7JwbmK64j91p_kUi4uter83dLSdzsrX8NwO4Tu28-aMs6s05dfd6/pub?gid=845632468&single=true&output=csv", {
                download: true,
                header: true,
                complete: (function(results) {
                      console.log("Downloaded publications.");
                      this.publications = results.data;
                      this.persistenceService.set('fitPublications', this.publications, {type: StorageType.SESSION});
            	}).bind(this)
            });
        } else {
            console.log("Using cached publications");
        }
    }
}
