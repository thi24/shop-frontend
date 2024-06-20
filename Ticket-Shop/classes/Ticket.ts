import type { BookingItem } from "./BookingItem";
import type { Customer } from "./Customer";
import type { TicketStatus } from "./TicketStatus";

export class Ticket {

    id = undefined as string | undefined;
    state = undefined as TicketStatus | undefined;
    price = undefined as number | undefined;
    taxRate = undefined as number | undefined;
    customer = undefined as Customer | undefined;
    bookingItem = undefined as BookingItem | undefined;

    constructor(id?: string, state?: TicketStatus, price?: number, taxRate?: number, customer?: Customer, bookingItem?: BookingItem) {
        this.id = id;
        this.state = state;
        this.price = price;
        this.taxRate = taxRate;
        this.customer = customer;
        this.bookingItem = bookingItem;
    }

}