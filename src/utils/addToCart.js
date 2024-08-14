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
        
            // add the new book id
            cartItemSet.add(id)

            // put it in localStorage
            localStorage.setItem("cart", JSON.stringify(Array.from(cartItemSet)))
            console.log("item added to LS : ", localStorage.getItem('cart'))
        }

        // Update the cart store
        cart.update(items => {
            items.add(id)
            return items;
        });

        console.log("Added to cart");
        return true;

    } catch (e) {
        console.log("Couldn't add to cart");
        console.error(e);
        return false;
    }
}

export default addToCart;
