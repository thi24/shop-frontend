export class Address {
    id: string;
    street: string;
    city: string;
    state: string;
    zip: string;

    constructor(street: string, city: string, state: string, zip: string, id?: string) {
        this.id = id || "";
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }
}