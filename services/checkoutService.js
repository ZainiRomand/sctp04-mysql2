// // make use of orderService and stripeService to check out a shopping cart
// const cartService = require('./cartService');
// const orderService = require('./orderService');
// const stripeService = require('./stripeService');

// async function checkout(userId)  {    
//     const orderItems = await cartService.getCartContents(userId);
//     const orderId = await orderService.createOrder(userId, orderItems);
//     const session = await stripeService.createCheckoutSession(userId, orderItems, orderId);
//     await orderService.updateOrderSessionId(orderId, session.id);
        
//     return session;
// }

// module.exports = {
//     checkout
// };
const cartService = require('./cartService');
const orderService = require('./orderService');
const stripeService = require('./stripeService');

async function checkout(userId) {
    // get all the cart items from the logged in user id
    const orderItems = await cartService.getCartContents(userId);
    
    // create the order and order items
    const orderId = await orderService.createOrder(userId, orderItems);

    // create the stripe session next
    const session = await stripeService.createCheckoutSession(userId, orderItems, orderId);

    // associate the created session with the order itself
    await orderService.updateOrderSessionId(orderId, session.id);

    return session;
}

module.exports = {
    checkout
}