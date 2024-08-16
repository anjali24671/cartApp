import connect from '$lib/connection'
import Cart from '$lib/models/Cart'

export async function POST({ request }) {
   
    try {
        const data = await request.json()
        const ids = data.ids
        const user_id = data.user_id
        
        await connect()

        const userCartRes = await Cart.findOne({user_id:'387e7a90-ba56-4221-8a3d-f683c69e1b66'})
        const mergedCart = [...new Set([...ids, ...userCartRes.cart_items])];
        const mergeCartRes = await Cart.updateOne({ user_id, cart_items: mergedCart })
        
        return new Response(JSON.stringify(
            { success: true, message:mergeCartRes }
        ))
    } catch (e) {
        return new Response(JSON.stringify(
            { status: 401, message: e.message }
        ))
    }

}




export async function GET({ url }) {
    try{
        return new Response(JSON.stringify("books"));


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





