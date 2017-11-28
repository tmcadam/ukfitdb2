import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    state: string = 'home';

    stateUpdate(event: string) {
        this.state = event;
        console.log(this.state);
    }
}
