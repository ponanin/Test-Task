import { Component, OnDestroy, OnInit } from '@angular/core';
import { IEvent } from '../event/event.model';
import { EventAddService } from '../event-add/event-add.service';
import { IndexDetails } from 'indexeddb-angular';
import { startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DBField, EventRepository, ISortParamsDictionary, SortType } from '../../database';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

    events: Array<IEvent> = [];

    sortVariants: Array<ISortParamsDictionary> = [
        { type: { indexName: DBField.DATE, order: SortType.DESC }, name: 'Дата по убыванию' },
        { type: { indexName: DBField.DATE, order: SortType.ASC  }, name: 'Дата по возрастанию' },
        { type: { indexName: DBField.TYPE, order: SortType.DESC }, name: 'Тип по убыванию' },
        { type: { indexName: DBField.TYPE, order: SortType.ASC  }, name: 'Тип по возрастанию' },
    ];

    filter: IndexDetails = this.sortVariants[0].type;
    error = '';
    onDestroy: Subject<void> = new Subject<void>();

    constructor(
        protected db: EventRepository,
        protected eventAddService: EventAddService
    ) {
    }

    ngOnInit() {
        this.eventAddService.flow.pipe(
            startWith(void 0),
            takeUntil(this.onDestroy)
        )
            .subscribe(() => {
                this.requestEvents();
            });
    }

    ngOnDestroy() {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    requestEvents() {
        this.db.getAllEvents(this.filter)
            .then((events: Array<IEvent>) => {
                this.events = events;
                this.error = '';
            }, (error) => {
                this.error = error;
            });
    }

    onFilterChange() {
        this.requestEvents();
    }
}
