import cart from "../store/cartStore";

function addToCart(id) {
    try {
        // Update the cart store
        cart.update(items => {
            items.add(id);
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
