import { Component, Input }     from '@angular/core';

import { StateService }         from '../state.service'

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent {
    constructor(public stateService: StateService) {}
}
