import { IndexDetails } from 'indexeddb-angular';

export interface ISortParamsDictionary {
    type: IndexDetails;
    name: string;
}

export enum DBField {
    TYPE = 'type',
    DATE = 'date'
}

export enum SortType {
    ASC = 'asc',
    DESC = 'desc'
}
