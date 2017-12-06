import { DebugElement }                     from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }                      from '@angular/forms';
import { By }                               from '@angular/platform-browser';

import { PersistenceService }  from 'angular-persistence';
import { ProgressHttp }        from "angular-progress-http";

import { AppModule }            from '../app.module';
import { SearchComponent }      from './search.component';
import { PublicationsService }  from '../publications.service';
import { SearchService }        from './search.service';

import { MockPublicationsService, MockPersistenceService, MockProgressHttp } from '../publications.service.mock';
import { MockSearchService } from './search.service.mock';

describe('SearchComponent', () => {
    let component:  SearchComponent;
    let fixture:    ComponentFixture<SearchComponent>;
    let de:         DebugElement;
    let el:         HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports:      [ FormsModule ],
            declarations: [ SearchComponent ],
            providers:    [ { provide: PublicationsService, useValue: MockPublicationsService },
                            { provide: SearchService, useValue: MockSearchService},
                            { provide: PersistenceService, useClass: MockPersistenceService },
                            { provide: ProgressHttp, useClass: MockProgressHttp } ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should disable/enable the search button depending on loading publications status', () => {
        component.pubs.loadingStatus = true;
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#searchButton.disabled'));
        expect(de).not.toBeNull();
        component.pubs.loadingStatus = false;
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#searchButton.disabled'));
        expect(de).toBeNull();
    });

});
