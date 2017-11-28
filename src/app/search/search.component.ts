import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
    @Output()
    stateUpdate = new EventEmitter<string>();

    search () {
        this.stateUpdate.emit('results');
    }
}
