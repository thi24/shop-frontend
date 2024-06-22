import { defineStore } from 'pinia';
export type Product = {
    id: string;
    name: string;
    quantity: number;
    price: number;
};

export const usePaymentStore = defineStore('payment', {
    state: () => ({
        orderNumber: '',
        eventName: '',
        amount: 0,
        products: [] as Product[],
    }),
    persist: true,
    actions: {
        setPaymentDetails(orderNumber: string, eventName: string, amount: number, products: Product[]) {
            this.orderNumber = orderNumber;
            this.eventName = eventName;
            this.amount = amount;
            this.products = products;
        },
    },
});
