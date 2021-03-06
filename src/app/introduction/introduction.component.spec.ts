import { DebugElement }             from '@angular/core'
import { async, ComponentFixture,
    TestBed }                       from '@angular/core/testing'
import { By }                       from '@angular/platform-browser'

import { StateService, Display }    from '../state.service'
import { IntroductionComponent }    from './introduction.component'

describe('IntroductionComponent', () => {
    let component:    IntroductionComponent
    let fixture:      ComponentFixture<IntroductionComponent>
    let el:           HTMLElement
    let stateService: StateService

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ IntroductionComponent ],
            providers: [StateService]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(IntroductionComponent)
        component = fixture.componentInstance
        el = fixture.debugElement.nativeElement
        stateService = TestBed.get(StateService)
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
    describe('state', () => {
        it('should display indtroduction view if stateService.state is HOME', () => {
          stateService.state = Display.HOME
          fixture.detectChanges()
          expect(el.querySelector('h5')).not.toBeNull()
          expect(el.querySelector('h5').textContent).toContain('Welcome to the FIT Publications Database')
        })

        it('should NOT display introduction view if stateService.state is not HOME', () => {
          stateService.state = Display.RESULTS
          fixture.detectChanges()
          expect(el.querySelector('h5')).toBeNull()
        })
    })

})
