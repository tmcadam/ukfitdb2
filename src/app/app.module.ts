import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ResultsComponent } from './results/results.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { SearchComponent } from './search/search.component';
import { PublicationsService } from './publications.service';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    IntroductionComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PublicationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
