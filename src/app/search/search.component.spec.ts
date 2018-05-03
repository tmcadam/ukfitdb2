import { DebugElement }                     from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule }                      from '@angular/forms'
import { By }                               from '@angular/platform-browser'

import { PersistenceService }   from 'angular-persistence'
import { ProgressHttp }         from "angular-progress-http"

import { SearchComponent }      from './search.component'
import { PublicationsService }  from '../publications.service'
import { SearchService }        from './search.service'
import { StateService, Display }         from '../state.service'

import { MockPublicationsService,
    MockPersistenceService, MockProgressHttp }  from '../publications.service.mock'
import { MockSearchService }                    from './search.service.mock'

describe('SearchComponent', () => {
    let component:      SearchComponent
    let fixture:        ComponentFixture<SearchComponent>
    let de:             DebugElement
    let el:             HTMLElement
    let searchService:  SearchService
    let stateService:   StateService

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports:      [ FormsModule ],
            declarations: [ SearchComponent ],
            providers:    [ StateService,
                            { provide: PublicationsService, useClass: MockPublicationsService },
                            { provide: SearchService, useClass: MockSearchService},
                            { provide: PersistenceService, useClass: MockPersistenceService },
                            { provide: ProgressHttp, useClass: MockProgressHttp }]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent)
        component = fixture.componentInstance
        el = fixture.debugElement.nativeElement
        searchService = TestBed.get(SearchService)
        stateService = TestBed.get(StateService)
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    describe('search method', () => {
        it('should call search function on the search service', ()=> {
            let search = spyOn(searchService, 'search')
            component.search()
            expect(search).toHaveBeenCalled()
        })
        it('should change the application state to "results"', () => {
            stateService.state = Display.HOME
            component.search()
            expect(stateService.state).toBe(Display.RESULTS)
        })
    })

    describe('search input', () => {
        let iel:HTMLInputElement
        beforeEach(() => {
            de =fixture.debugElement.query(By.css('#searchInput'))
        })
        it('it should update searchService->searchTerm when changed', async(() => {
            fixture.detectChanges()
            fixture.whenStable().then(() => {
                de.nativeElement.value = 'someValue'
                de.nativeElement.dispatchEvent(new Event('input'))
                expect(searchService.searchTerm).toBe('someValue')
            })
        }))
        it('it should be updated when searchservice->searchTerm is changed', async(() => {
            searchService.searchTerm = "sausages"
            fixture.detectChanges()
            fixture.whenStable().then(() => {
                expect(de.nativeElement.value).toBe("sausages")
            })
        }))
        it('should call the search method when enter key is pressed', () => {
            let search = spyOn(searchService, 'search')
            const event = new KeyboardEvent("keyup",{ "key": "Enter"})
            de.nativeElement.dispatchEvent(event)
            expect(search).toHaveBeenCalled()
        })
    })

    describe('search button', () => {
        it('should call the search method when clicked', () => {
            let search = spyOn(searchService, 'search')
            fixture.debugElement.query(By.css('#searchButton')).nativeElement.click()
            expect(search).toHaveBeenCalled()
        })
        it('should be disabled when publications are being loaded', () => {
            component.pubs.loadingStatus = true
            fixture.detectChanges()
            de = fixture.debugElement.query(By.css('#searchButton.disabled'))
            expect(de).not.toBeNull()
        })
        it('should be enabled when publications are not being loaded', () => {
            component.pubs.loadingStatus = false
            fixture.detectChanges()
            de = fixture.debugElement.query(By.css('#searchButton.disabled'))
            expect(de).toBeNull()
        })
    })

})
