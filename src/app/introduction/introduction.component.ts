import { Component, Input }     from '@angular/core'

import { StateService, Display }         from '../state.service'

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent {
    public display = Display
    constructor(public stateService: StateService) {}
}
