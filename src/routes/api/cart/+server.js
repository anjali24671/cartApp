import connect from '$lib/connection'
import Cart from '$lib/models/Cart'

export async function POST({ request }) {
    try {
        const data = await request.json()
        const ids = data.ids
        const user_id = data.user_id
        const operation = data.operation
        
        await connect()

        const userCartRes = await Cart.findOne({ user_id })
        
        let updatedCart
        console.log(ids)
        

        if (operation === 'remove') {
            const updatedCart = userCartRes.cart_items.filter( item=> item !== ids)
            updatedCart = await Cart.updateOne({ user_id, cart_items: updatedCart })
            
        }
        // Addition
        else {
            const mergedCart = [...new Set([...ids, ...userCartRes.cart_items])];
            updatedCart = await Cart.updateOne({ user_id, cart_items: mergedCart })
        }

        
        return new Response(JSON.stringify(
            { success: true,  updatedCart}
        ))
    }
    catch (e) {
        return new Response(JSON.stringify(
            { status: 401, message: e.message }
        ))
    }
}


export async function GET({ url }) {

    const user_id = url.searchParams.get('user_id')

    try {
        
        await connect()

        const userCartRes = await Cart.findOne({ user_id })

        if(!userCartRes) return new Response(JSON.stringify([]));

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





