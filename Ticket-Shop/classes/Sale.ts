export class Sale {
  ticketTypeId: string;
  quantity: number;
  constructor(ticketTypeId: string, quantity: number) {
    this.ticketTypeId = ticketTypeId;
    this.quantity = quantity;
  }
}
