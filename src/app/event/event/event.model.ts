export interface IEvent {
    id?: number;
    date: string;
    type: EventType;
}

export interface ITransaction extends IEvent {
    amount: number;
    currency: Currency;
    from: string;
    description: string;
    isPositive: boolean;
}

export interface INews extends IEvent {
    heading: string;
    content: string;
    isSeen: boolean;
}

export enum EventType {
    Transaction = 'Transaction',
    News = 'News'
}

export const TYPES_NAMING = {
    [EventType.Transaction]: 'Транзакция',
    [EventType.News]: 'Новость'
};

export enum Currency {
    Dollar = '$',
    Ruble = '₽',
    Euro = '€',
    Pound = '£'
}

