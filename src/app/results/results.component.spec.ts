import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By }                               from '@angular/platform-browser'
import { AppModule }                        from '../app.module'

import { ResultsComponent }         from './results.component'
import { StateService, Display }    from '../state.service'
import { SearchService }            from '../search/search.service'
import { MockSearchService }        from '../search/search.service.mock'
import { MOCK_PUBLICATIONS }        from '../publications.mock'

describe('ResultsComponent', () => {
    let component       :ResultsComponent
    let fixture         :ComponentFixture<ResultsComponent>
    let el              :HTMLElement
    let stateService    :StateService
    let searchService   :SearchService

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ AppModule ],
            providers: [
                StateService,
                { provide: SearchService, useClass: MockSearchService }
            ]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultsComponent)
        component = fixture.componentInstance
        el = fixture.debugElement.nativeElement
        fixture.detectChanges()
        stateService = TestBed.get(StateService)
        searchService = TestBed.get(SearchService)
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    describe('state', () => {
        it('should display results view if stateService.state is not RESULTS', () => {
            stateService.state = Display.RESULTS
            fixture.detectChanges()
            expect(el.querySelector('ngx-datatable')).not.toBeNull()
        })

        it('should NOT display results view if stateService.state is not RESULTS', () => {
            stateService.state = Display.HOME
            fixture.detectChanges()
            expect(el.querySelector('ngx-datatable')).toBeNull()
        })
    })

    describe('data-table', () => {
        beforeEach(() => {
            stateService.state = Display.RESULTS
        })
        it('should display no results if no results are stored in searchService', () => {
            searchService.results = []
            fixture.detectChanges()
            expect(el.querySelector('div.empty-row')).not.toBeNull()
            expect(el.querySelector('div.empty-row').textContent).toContain('No publications found')
        })
        it('should display results if results are stored in searchService', () => {
            searchService.results = MOCK_PUBLICATIONS
            fixture.detectChanges()
            expect(el.querySelector('datatable-body-row')).not.toBeNull()
            expect(el.querySelectorAll('datatable-body-row').length).toBe(MOCK_PUBLICATIONS.length)
        })
        it('should not paginate results if less than 10', () => {
            searchService.results = MOCK_PUBLICATIONS
            fixture.detectChanges()
            expect(el.querySelector('datatable-pager').hasAttribute('hidden')).toEqual(true);
        })
        it('should paginate the results if there are more than 10', () => {
            searchService.results = MOCK_PUBLICATIONS.concat(MOCK_PUBLICATIONS).concat(MOCK_PUBLICATIONS)
            expect(searchService.results.length).toBe(15) //should give us 15
            fixture.detectChanges()
            expect(el.querySelectorAll('datatable-body-row').length).toBe(10)
            expect(el.querySelector('datatable-pager').hasAttribute('hidden')).toEqual(false)
            })
        it('it should display the number of results found', () => {
            searchService.results = MOCK_PUBLICATIONS
            fixture.detectChanges()
            expect(el.querySelector('div.page-count').textContent).toContain('5 results')
        })
        it('should toggle additional row detail when down arrow clicked', () => {
            searchService.results = MOCK_PUBLICATIONS
            fixture.detectChanges()
            expect(el.querySelector('div.table-detail')).toBeNull()
            fixture.debugElement.query(By.css('a.datatable-icon-right')).nativeElement.click()
            expect(el.querySelectorAll('div.table-detail').length).toBe(1)
            fixture.debugElement.query(By.css('a.datatable-icon-down')).nativeElement.click()
            expect(el.querySelector('div.table-detail')).toBeNull()
        })
        // This is breaking tests intermittently :-(
        xit('should only display one row detail at a time', async(() => {
            searchService.results = MOCK_PUBLICATIONS
            fixture.detectChanges()
            fixture.debugElement.nativeElement.querySelectorAll('a.datatable-icon-right')[0].click()
            fixture.whenStable().then(() => {
                fixture.debugElement.nativeElement.querySelectorAll('a.datatable-icon-right')[1].click()
                fixture.whenStable().then(() => {
                    expect(el.querySelectorAll('div.table-detail').length).toBe(1)
                })
            })
        }))
    })
})
