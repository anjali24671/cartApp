import connect from '$lib/connection';
import Cart from '$lib/models/Cart';

export async function POST({ request }) {
    try {
        const data = await request.json();
        const ids = data.ids;  // Make sure `ids` is an array
       
        const user_id = data.user_id;
        const operation = data.operation;

        await connect();

        const userCartRes = await Cart.findOne({ user_id });

        let updatedCart;

        // If operation is 'remove', filter out the items
        if (operation === 'remove') {


            const filteredCartItems = userCartRes.cart_items.filter(item => !ids.includes(item));

            updatedCart = await Cart.updateOne(
                { user_id },
                { $set: { cart_items: filteredCartItems } }
            );
        } 
        // If operation is 'add', merge the new items with the existing items
        else {
            const mergedCart = [...new Set([...userCartRes.cart_items, ...ids])];
            updatedCart = await Cart.updateOne(
                { user_id },
                { $set: { cart_items: mergedCart } }
            );
        }

        return new Response(JSON.stringify(
            { success: true, updatedCart }
        ));
    }
    catch (e) {
        return new Response(JSON.stringify(
            { status: 401, message: e.message }
        ));
    }
}

export async function GET({ url }) {
    const user_id = url.searchParams.get('user_id');

    try {
        await connect();

        const userCartRes = await Cart.findOne({ user_id });

        if (!userCartRes) {
            return new Response(JSON.stringify([]));
        }

        return new Response(JSON.stringify(userCartRes.cart_items));
    } catch (error) {
        console.error('Error fetching Books:', error);
        return new Response(JSON.stringify({ status: 401, message: error.message }), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 401
        });
    }
}
