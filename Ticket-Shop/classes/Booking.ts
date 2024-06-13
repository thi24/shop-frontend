import type { Customer } from "./Customer";
import type { Sale } from "./Sale";
export class Booking {
  eventId: string;
  customer: Customer;
  bookingItems: Array<Sale>;

  constructor(customer: Customer, bookingItems: Array<Sale>, id?: string) {
    this.eventId = id || "";
    this.customer = customer;
    this.bookingItems = bookingItems;
  }
  toJSON() {
    return JSON.stringify({
      order: {
        eventId: this.eventId,
        customer: this.customer,
        bookingItems: this.bookingItems,
      },
    });
  }
}
