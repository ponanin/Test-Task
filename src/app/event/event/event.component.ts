import { Component, Input } from '@angular/core';
import { EventType, IEvent, ITransaction, TYPES_NAMING } from './event.model';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent {

    @Input() event: IEvent;

    get isTransaction() {
        return this.event && this.event.type === EventType.Transaction;
    }

    get isNews() {
        return this.event && this.event.type === EventType.News;
    }

    get nameOfType() {
        let result = '';
        if (this.event) {
            result = TYPES_NAMING[this.event.type];
        }
        return result;
    }

    get amount() {
        let result = 0;
        if (this.event && this.isTransaction) {
            result = Math.abs((this.event as ITransaction).amount);
        }
        return result;
    }
}
