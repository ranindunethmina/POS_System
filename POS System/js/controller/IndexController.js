document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('invoiceDetails');

    let orders = [];
    let editIndex = -1;
    let orderIdCounter = 1;  // Counter for generating unique order IDs

    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const orderId = document.getElementById('orderId').value || generateOrderId();

        const order = {
            id: orderId,
        };

        if (editIndex >= 0) {
            orders[editIndex] = order;
            editIndex = -1;
        } else {
            orders.push(order);
            orderIdCounter++;  // Increment the counter for the next order ID
        }

        // orderForm.reset();
        updateNextOrderId();  // Update the next order ID field
    });

    function generateOrderId() {
        return `ORD-${orderIdCounter.toString().padStart(4, '0')}`;  // Example: ORD-0001
    }

    function updateNextOrderId() {
        document.getElementById('orderId').value = generateOrderId();
    }

    // Initialize with a new order ID when the page loads
    updateNextOrderId();
});
