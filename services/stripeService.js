// // Include stripe
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// function createLineItems(orderItems) {
//     const lineItems = orderItems.map(item => ({
//         price_data: {
//             currency: 'usd',
//             product_data: {
//                 name: item.productName,
//                 images: [item.imageUrl || 'https://via.placeholder.com/150'],
//                 metadata: {
//                     product_id: item.product_id
//                 }
//             },
//             // Convert price to integer cents
//             unit_amount: Math.round(item.price * 100)
//         },
//         quantity: item.quantity
//     }));
//     // const lineItems = [];
//     // for (let item of orderItems) {
//     //     const lineItem = {
//     //         'price_data': {
//     //             'currency': 'sgd',
//     //             'product_data': {
//     //                 'name': item.productName,
//     //                 'images': [item.imageUrl || 'https://via.placeholder.com/150'],
//     //                 'metadata': {
//     //                     'product_id': item.product_id
//     //                 }
//     //             }
//     //         },
//     //         'quantity': item.quantity
//     //     }
//     //     lineItem.push(lineItem);

//     return lineItems;
// }


// async function createCheckoutSession(userId, orderItems, orderId) {
//     const lineItems = createLineItems(orderItems);

//     // 2nd parameter of stripe.checkout.create i sthe create configuration of checkout
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: lineItems,
//         mode: 'payment',
//         success_url: `https://www.google.com`,
//         cancel_url: `https://www.yahoo.com`,
//         // store data that STRIPE do not have in metadata
//         metadata: {
//             userId: userId,
//             orderId: orderId
//         }
//     });

//     // this is a session data that we will send to the user
//     // and the user can use this to make payment at Stripe
//     return session;
// }
// initialise stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createCheckoutSession(userId, orderItems, orderId) {
    const lineItems = createLineItems(orderItems);
    
    // 2nd parameter of stripe.checkout.sessions.create is the configuration of checkout
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'], 
        line_items: lineItems,
        mode: 'payment',
        success_url: "https://www.google.com",
        cancel_url:"https://www.yahoo.com",
        // store customized data which stripe doesn't provide for in metadata
        metadata: {
            userId: userId,
            orderId: orderId
        }
    });

    // this is the session data that we will send to the user
    // and the user can use this to make payment at Stripe
    return session;
}

async function createLineItems(orderItems) {
    const lineItems =  [];
    for (let item of orderItems) {
        // structure of a line item in Stripe
        const lineItem = {
            'price_data':{
                'currency':'sgd',
                'product_data':{
                    'name': item.productName,
                    'images': [item.imageUrl || 'https://placehold.co/400'],
                    'metadata':{
                        'product_id': item.product_id
                    }
                },
                // is in cents and must be integer
                'unit_amount': Math.round(item.price * 100)
            },
            'quantity': item.quantity
        }
        itemItems.push(lineItem);
    }
    return lineItems;
}

module.exports = {
    createCheckoutSession,
    createLineItems
}