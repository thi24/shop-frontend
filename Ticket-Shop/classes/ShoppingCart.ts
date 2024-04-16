import type { TicketType } from "./TicketType";

export class ShoppingCart {

    id = undefined as string | undefined;
    ticketType = undefined as TicketType | undefined;
    number = undefined as number | undefined;

    constructor(id?: string, ticketType?: TicketType, number?: number) {
        this.id = id;
        this.ticketType = ticketType;
        this.number = number;
    }

}