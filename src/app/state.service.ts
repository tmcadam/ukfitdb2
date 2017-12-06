import { Injectable }   from '@angular/core';

export enum Display {
    HOME,
    RESULTS
}

@Injectable()
export class StateService {
    state :Display = Display.HOME
}
