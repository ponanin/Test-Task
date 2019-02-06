import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventRepository } from './database/event-repository.service';
import { EventComponent } from './event/event/event.component';
import { RouteModule } from './route/route.module';
import { EventAddComponent } from './event/event-add/event-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventAddService } from './event/event-add/event-add.service';
import { EventDetailedComponent } from './event/event-detailed/event-detailed.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        EventListComponent,
        EventComponent,
        EventAddComponent,
        EventDetailedComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouteModule,

    ],
    providers: [EventRepository, EventAddService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
