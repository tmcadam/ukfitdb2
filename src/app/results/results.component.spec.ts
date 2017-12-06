import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { AppModule } from '../app.module'

import { ResultsComponent } from './results.component'

describe('ResultsComponent', () => {
    let component: ResultsComponent
    let fixture: ComponentFixture<ResultsComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ AppModule ]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
