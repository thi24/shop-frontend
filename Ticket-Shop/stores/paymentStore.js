import { defineStore } from 'pinia';

export const usePaymentStore = defineStore('payment', {
    
    state: () => ({
        orderNumber: '',
        eventName: '',
        amount: 0,
        products: [],
    }),
    persist: true,
    actions: {
        setPaymentDetails(orderNumber, eventName, amount, products) {
            this.orderNumber = orderNumber;
            this.eventName = eventName;
            this.amount = amount;
            this.products = products;
        },
    },
});
