import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventAddService {

    private _flow = new Subject<boolean>();

    notify() {
        this._flow.next(true);
    }

    get flow() {
        return this._flow;
    }
}
