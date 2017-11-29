import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ResultsComponent } from './results/results.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { SearchComponent } from './search/search.component';
import { PublicationsService } from './publications.service';
import { SearchService } from './search.service';
import { PersistenceModule } from 'angular-persistence';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    IntroductionComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    PersistenceModule,
    NgxDatatableModule
  ],
  providers: [PublicationsService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
