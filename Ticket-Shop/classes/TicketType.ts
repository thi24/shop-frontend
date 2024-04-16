import type { Event } from "./Event";

export class TicketType {

    id = undefined as string | undefined;
    name = undefined as string | undefined;
    price = undefined as number | undefined;
    taxRate = undefined as number | undefined;
    capacity = undefined as number | undefined;
    active = undefined as boolean | undefined;
    validFrom = undefined as Date | undefined;
    validTo = undefined as Date | undefined;
    event = undefined as Event | undefined;

    constructor(
        id?: string, 
        name?: string, 
        price?: number, 
        taxRate?: number, 
        capacity?: number,
        active?: boolean,
        validFrom?: Date,
        validTo?: Date,
        event?: Event) 
        {

        this.id = id;
        this.name = name;
        this.price = price;
        this.taxRate = taxRate;
        this.capacity = capacity;
        this.active = active;
        this.validFrom = validFrom;
        this.validTo = validTo;
        this.event = event;
    }

}