import connect from '$lib/connection'
import Cart from '$lib/models/Cart.js'


// Upon signUp, make an empty cart for the user
export async function POST({ request }) {
   
    try {
        const data = await request.json()
       
        // // add the userfront ID to User table, in order to map the two.
        await connect()
        
        const userCartResponse = await Cart.create({ user_id: data.record.userUuid })
        console.log(userCartResponse)
        
        return new Response(JSON.stringify(
            { status: 200, userCartResponse }
        ))

    } catch (e) {
        return new Response(JSON.stringify(
            { status: 401, message: e.message }
        ), { status: 401 })
    }
    
   
}