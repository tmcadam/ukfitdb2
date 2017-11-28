import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SearchService } from '../search.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, AfterViewInit {
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    dtOptions: DataTables.Settings = {};

    dtTrigger: Subject<any> = new Subject();

    @Input() state: string;
    constructor(private search: SearchService) { }

    ngOnInit(): void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        searching: false,
        dom: '<"top"i>rt<"bottom" lp><"clear">'
        };
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
        });
    }
}
