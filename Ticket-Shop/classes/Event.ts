import { Address } from "./Address";

export class Event {
  
    id = "" as string;
    eventName = "" as string;
    thumbnail = "" as string;
    startsAt = new Date() as Date;
    endsAt = new Date() as Date;
    address = new Address("", "", "", "");
    description = "" as string;

}