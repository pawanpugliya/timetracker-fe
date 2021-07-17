import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackerDetailsComponent } from './partials/tracker-details/tracker-details.component';
import { TrackerFormComponent } from './partials/tracker-form/tracker-form.component';
import { TrackerService } from './tracker.service';

@NgModule({
  declarations: [
    AppComponent,
    TrackerDetailsComponent,
    TrackerFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [TrackerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
