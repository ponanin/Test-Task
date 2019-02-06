import { Injectable } from '@angular/core';
import { IndexDetails, IndexedDBAngular } from 'indexeddb-angular';
import { IEvent } from '../event/event/event.model';
import { DBField } from './event-repository.const';

const DATABASE_NAME = 'testDB';
const EVENT_COLLECTION_NAME = 'event';

@Injectable({
    providedIn: 'root'
})
export class EventRepository {

    private _instance = new IndexedDBAngular(DATABASE_NAME, 1);

    private async initialize() {
        return this._instance.createStore(1, (db) => {
            const objectStore: IDBObjectStore = db.currentTarget.result.createObjectStore(EVENT_COLLECTION_NAME, {
                keyPath: 'id',
                autoIncrement: true
            });
            objectStore.createIndex(DBField.TYPE, DBField.TYPE);
            objectStore.createIndex(DBField.DATE, DBField.DATE);
        });
    }

    async getAllEvents(sortParams?: IndexDetails): Promise<Array<IEvent>> {
        await this.initialize();
        return this._instance.getAll(EVENT_COLLECTION_NAME, null, sortParams);
    }

    async getById(id: number): Promise<IEvent> {
        await this.initialize();
        return this._instance.getByKey(EVENT_COLLECTION_NAME, id);

    }

    async addEvent(event: IEvent) {
        await this.initialize();
        return this._instance.add(EVENT_COLLECTION_NAME, event);
    }

    async remove(id: number) {
        await this.initialize();
        return this._instance.delete(EVENT_COLLECTION_NAME, id);
    }

    async update(value: IEvent): Promise<IEvent> {
        await this.initialize();
        return this._instance.update(EVENT_COLLECTION_NAME, value);
    }
}


