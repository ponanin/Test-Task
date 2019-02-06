import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from '../event/event-list/event-list.component';
import { EventDetailedComponent } from '../event/event-detailed/event-detailed.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'events', pathMatch: 'full'
    },
    {
        path: 'events', component: EventListComponent
    },
    {
        path: 'event/:id', component: EventDetailedComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: []
})
export class RouteModule {
}
