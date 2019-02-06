import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventType, IEvent, INews, TYPES_NAMING } from '../event/event.model';
import { EventRepository } from '../../database';

@Component({
    selector: 'app-event-detailed',
    templateUrl: './event-detailed.component.html',
    styleUrls: ['./event-detailed.component.scss']
})
export class EventDetailedComponent implements OnInit {

    event: IEvent = null;
    error = '';

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected db: EventRepository
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params) => {
                if (params.id && !isNaN(+params.id)) {
                    this.requestEvent(+params.id);
                }
            }
        );
    }

    requestEvent(id: number) {
        this.db.getById(id)
            .then((eventData) => {
                this.event = eventData;
            }, (error) => {
                this.error = error;
            });
    }

    get nameOfType() {
        let result = '';
        if (this.event) {
            result = TYPES_NAMING[this.event.type];
        }
        return result;
    }

    get isTransaction() {
        return this.event && this.event.type === EventType.Transaction;
    }

    get isNews() {
        return this.event && this.event.type === EventType.News;
    }

    remove() {
        //TODO переделать на нормальный диалог
        if (confirm('Вы уверены, что хотите удалить транзакцию?')) {
            this.db.remove(this.event.id)
                .then(() => {
                    this.router.navigateByUrl('/events');
                }, (error) => {
                    this.error = error;
                });
        }
    }

    see() {
        if (this.isNews) {
            (this.event as INews).isSeen = true;
            this.db.update(this.event).then(() => {
                this.router.navigateByUrl('/events');
            }, (error) => {
                this.error = error;
            });
        }
    }

}
