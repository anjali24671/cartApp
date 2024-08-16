import connect from '$lib/connection'
import Cart from '$lib/models/Cart'

export async function POST({ request }) {
   
    try {

        return new Response(JSON.stringify(
            { success: true, message:'hello' }
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





