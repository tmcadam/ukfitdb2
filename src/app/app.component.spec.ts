import { TestBed, fakeAsync, tick, async, ComponentFixture }   from '@angular/core/testing';
import { By } from '@angular/platform-browser';
declare var $ :any;

import { AppComponent }     from './app.component';
import { AppModule }        from './app.module';

import { PublicationsService }      from './publications.service';
import { MockPublicationsService }  from './publications.service.mock';
import { SearchService }            from './search/search.service';
import { MockSearchService }        from './search/search.service.mock';

describe('AppComponent', () => {
    let component:    AppComponent;
    let fixture:      ComponentFixture<AppComponent>;
    let el:           HTMLElement;

    let publicationsService: PublicationsService;
    let searchService: SearchService;

    beforeEach(async(() => {

          TestBed.configureTestingModule({
              imports: [ AppModule ],
              providers: [
                  { provide: SearchService, useClass: MockSearchService },
                  { provide: PublicationsService, useClass: MockPublicationsService }
              ]
          }).compileComponents();
          fixture = TestBed.createComponent(AppComponent);
          component = fixture.componentInstance;
          publicationsService = TestBed.get(PublicationsService);
          searchService = TestBed.get(SearchService);
      }));

      it('should create the app', async(() => {
          const fixture = TestBed.createComponent(AppComponent);
          const app = fixture.debugElement.componentInstance;
          expect(app).toBeTruthy();
      }));

      it('it should call PublicationsService->loadPublications when loaded', async(() => {
          let loadPublications = spyOn(publicationsService, 'loadPublications');
          const fixture = TestBed.createComponent(AppComponent);
          fixture.detectChanges();
          fixture.whenStable().then(() => {
              expect(loadPublications).toHaveBeenCalled();
          })
      }));

      xit('it should call ngAfterViewChecked after loading', async(() => {
          const fixture = TestBed.createComponent(AppComponent);
          let ngAfterViewInit = spyOn(component, 'ngAfterViewInit');
          fixture.detectChanges();
          setTimeout(() =>{
              expect(ngAfterViewInit).toHaveBeenCalled();
          }, 1000);
      }));

      xit('it should allow the preload to stay for 1000ms', async(() => {
          const fixture = TestBed.createComponent(AppComponent);
          let ngAfterViewInit = spyOn(component, 'ngAfterViewInit');
          fixture.whenStable().then(() => {
              expect($('#preload').is( ":hidden" )).toBeFalsy();
          })
      }));

      xit('it should hide the preload div after a 1000ms delay', fakeAsync(() => {
          const fixture = TestBed.createComponent(AppComponent);
          tick(1100);
          fixture.detectChanges();
          expect($('#preload').is( ":hidden" )).toBeTruthy();
      }));

      describe('navbar', () => {
          describe('page title', () => {
              it('it should call navHome when clicked', () => {
                  let navHome = spyOn(component, 'navHome');
                  fixture.debugElement.query(By.css('a.brand-logo')).nativeElement.click();
                  expect(navHome).toHaveBeenCalled();
              });
          })
          describe('progress bar', () => {
                it('it should be visible when publications->loadingStatus is true', () => {
                    publicationsService.loadingStatus = true;
                    fixture.detectChanges();
                    expect(fixture.debugElement.query(By.css('div.progress')).styles['display']).toBe('block');
                });
                it('it should not be visible when publications->loadingStatus is false', () => {
                    publicationsService.loadingStatus = false;
                    fixture.detectChanges();
                    expect(fixture.debugElement.query(By.css('div.progress')).styles['display']).toBe('none');
                });
                it('it should respond to changes in publications->loadingProgress', () => {
                    publicationsService.loadingProgress = '50%';
                    fixture.detectChanges();
                    expect(fixture.debugElement.query(By.css('div.determinate')).styles['width']).toBe('50%');
                    publicationsService.loadingProgress = '62%';
                    fixture.detectChanges();
                    expect(fixture.debugElement.query(By.css('div.determinate')).styles['width']).toBe('62%');
                });
          })
      });

      describe('menu', () => {

          describe('home button', () => {
              it('it should call navHome when clicked', () => {
                  let navHome = spyOn(component, 'navHome');
                  fixture.debugElement.nativeElement.querySelector('#btn-home').click();
                  expect(navHome).toHaveBeenCalled();
              });
          })
          describe('navHome', () => {
              it('it should set app->state to "home" and searchService->search to ""', () => {
                  component.state = 'results';
                  searchService.searchTerm = 'seaweed';
                  component.navHome();
                  expect(component.state).toBe('home');
                  expect(searchService.searchTerm).toBe('');
              });
          })
          describe('reload button', () => {
              it('it should call refreshData when clicked', () => {
                  let refreshData = spyOn(component, 'refreshData');
                  fixture.debugElement.nativeElement.querySelector('#btn-refresh').click();
                  expect(refreshData).toHaveBeenCalled();
              });
          })
          describe('refreshData', () => {
              it('it should call publications->reloadPublications', () => {
                  let reloadPublications = spyOn(publicationsService, 'reloadPublications');
                  component.refreshData();
                  expect(reloadPublications).toHaveBeenCalled();
              });
          })
      });

});
