import { TestBed, inject } from '@angular/core/testing';

import { EventRepository } from './event-repository.service';

describe('EventRepository', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EventRepository]
        });
    });

    it('should be created', inject([EventRepository], (service: EventRepository) => {
        expect(service).toBeTruthy();
    }));
});
