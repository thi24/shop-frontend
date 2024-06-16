import type { TicketType } from "./TicketType";

export class BookingItem {

    id = undefined as string | undefined;
    quantity = undefined as number | undefined;
    ticketType = undefined as TicketType | undefined;
    ticketTypeId = undefined as string | undefined;

    constructor(id?: string, quantity?: number, ticketType?: TicketType, ticketTypeId?: string) {
        this.id = id;
        this.quantity = quantity;
        this.ticketType = ticketType;
        this.ticketTypeId = ticketTypeId;
    }

}