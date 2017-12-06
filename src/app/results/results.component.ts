import { Component, Input, ViewEncapsulation,
    ViewChild }                 from '@angular/core'

import { SearchService }        from '../search/search.service'
import { StateService }         from '../state.service'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultsComponent  {
    @ViewChild('resultsTable') table: any;

    constructor(private search: SearchService,
                public stateService: StateService) { }
    
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
