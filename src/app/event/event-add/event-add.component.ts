import { Component, HostListener, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Currency, EventType, TYPES_NAMING } from '../event/event.model';
import { EventAddService } from './event-add.service';
import { EventRepository } from '../../database';

@Component({
    selector: 'app-event-add',
    templateUrl: './event-add.component.html',
    styleUrls: ['./event-add.component.scss'],
    animations: [
        trigger('popupVisibilityChange', [
            state('opened', style({ opacity: 1, visibility: 'visible', zIndex: 9999 })),
            state('closed', style({ opacity: 0, visibility: 'hidden', zIndex: -2 })),
            transition('* => *', animate('150ms')),
        ])
    ]
})
export class EventAddComponent {

    @Input()
    isVisiblePopup: boolean;

    form: FormGroup;

    typesNaming = [];

    activeForm = '';

    currencies = Object.values(Currency);

    error = '';

    @HostListener('keydown.esc')
    closeOnEsc() {
        this.isVisiblePopup = false;
    }

    constructor(
        protected db: EventRepository,
        protected eventAddService: EventAddService
    ) {
        for (const type in TYPES_NAMING) {
            if (TYPES_NAMING.hasOwnProperty(type)) {
                this.typesNaming.push({
                    name: TYPES_NAMING[type],
                    value: type
                });
            }
        }

        this.form = new FormGroup({
            type: new FormControl(),
            [EventType.Transaction]: new FormGroup({
                amount: new FormControl('', Validators.required),
                currency: new FormControl(),
                from: new FormControl('', Validators.required),
                description: new FormControl('', Validators.required),
            }),
            [EventType.News]: new FormGroup({
                heading: new FormControl('', Validators.required),
                content: new FormControl('', Validators.required),
            })
        });

        this.initializeForm();

        this.form.controls.type.valueChanges
            .subscribe((value) => {
                this.activeForm = value;
            });
    }

    initializeForm() {
        this.form.patchValue({
            type: EventType.Transaction,
            [EventType.Transaction]: {
                currency: Currency.Ruble
            }
        });
    }

    showPopup(event): void {
        event.preventDefault();
        this.isVisiblePopup = true;
    }

    closeHandler(): void {
        this.isVisiblePopup = false;
    }


    clearForm() {
        this.form.reset();
        this.initializeForm();
    }

    add() {
        const formValue = this.form.value;
        const date = Math.floor(new Date().getTime() / 1000);
        const type = this.activeForm as EventType;

        let newEvent = null;
        let needValue = null;

        switch (this.activeForm) {
            case EventType.Transaction:
                needValue = formValue[EventType.Transaction];
                newEvent = {
                    date: date,
                    type: type,
                    amount: needValue.amount,
                    currency: needValue.currency,
                    from: needValue.from,
                    description: needValue.description,
                    isPositive: needValue.amount > 0
                };
                break;
            case EventType.News:
                needValue = formValue[EventType.News];
                newEvent = {
                    date: date,
                    type: type,
                    heading: needValue.heading,
                    content: needValue.content,
                    isSeen: false
                };
                break;
        }
        if (newEvent) {
            this.db.addEvent(newEvent)
                .then(
                    () => {
                        this.eventAddService.notify();
                        this.isVisiblePopup = false;
                    }, (error) => {
                        this.error = error;
                    }
                );
        }
    }

    get isTransactionForm() {
        return this.activeForm === EventType.Transaction;
    }

    get isNewsForm() {
        return this.activeForm === EventType.News;
    }

}
