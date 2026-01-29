import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        console.log("Starting checkout process...");
        if (this.inventoryService.checkStock(orderDetails.productIds)) {
            // Assuming amount is passed in orderDetails, otherwise defaulting to 0 for demo
            if (this.paymentService.processPayment(orderDetails.userId, orderDetails.amount || 100)) {
                const shippingDetails = this.shippingService.arrangeShipping(orderDetails.userId, orderDetails.shippingInfo);
                console.log(`Checkout complete. Tracking ID: ${shippingDetails.trackingId}`);
            } else {
                console.log("Payment failed.");
            }
        } else {
            console.log("Items not in stock.");
        }
    }
}

export { CheckoutFacade };
