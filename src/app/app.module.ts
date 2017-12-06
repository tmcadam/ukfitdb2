import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from "@angular/http"

import { AppComponent } from './app.component'
import { ResultsComponent } from './results/results.component'
import { IntroductionComponent } from './introduction/introduction.component'
import { SearchComponent } from './search/search.component'

import { PublicationsService } from './publications.service'
import { SearchService } from './search/search.service'
import { StateService } from './state.service'

import { PersistenceModule } from 'angular-persistence'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { ProgressHttpModule } from "angular-progress-http"

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    IntroductionComponent,
    SearchComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    ProgressHttpModule,
    PersistenceModule,
    NgxDatatableModule
  ],
  providers: [PublicationsService, SearchService, StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
