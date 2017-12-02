import { Component, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultsComponent  {
    @ViewChild('resultsTable') table: any;

    @Input() state: string;
    constructor(private search: SearchService) { }

    currentRow;

    toggleExpandRow(row) {
        if (this.currentRow && this.currentRow != row) {
            this.table.rowDetail.toggleExpandRow(this.currentRow);
        }
        this.table.rowDetail.toggleExpandRow(row);
    }

    onDetailToggle(event) {
        this.currentRow = null;
        if(!document.querySelector(".datatable-row-detail")) {
            this.currentRow = event.value;
        }
    }
}
