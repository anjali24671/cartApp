import cart from "../store/cartStore";

function addToCart(id) {
    try {
        


        // bypass SSR and only execute in broweser env
        if (typeof window !== 'undefined') {

            // get cart items from localStorage
            const prevCartArr = localStorage.getItem('cart')
            let cartItemArr

            if (prevCartArr) {
                cartItemArr = JSON.parse(localStorage.getItem('cart')) 
            } else {
                cartItemArr =  []
            }
            
            const cartItemSet = new Set(cartItemArr)
        
            // add the new book id in set
            cartItemSet.add(id)

            // put set back in localStorage
            localStorage.setItem("cart", JSON.stringify(Array.from(cartItemSet)))
        }

        // Update the cart store
        cart.update(items => {
            items.add(id)
            return items;
        });

        return true;

    } catch (e) {
        console.log("Couldn't add to cart");
        console.error(e);
        return false;
    }
}

export default addToCart;
