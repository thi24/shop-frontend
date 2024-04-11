export class Customer {

    email = undefined as string | undefined;
    name =  undefined as string | undefined;
    stripeId = undefined as string | undefined;

    constructor(email?: string, name?: string, stripeId?: string) {
        this.email = email;
        this.name = name;
        this.stripeId = stripeId;
    }

}