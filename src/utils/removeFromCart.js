import cart from "../store/cartStore";

function removeFromCart(id) {
    try {
        // Update the cart store
        cart.update(items => {
            items.delete(id);
            return items;
        });


        console.log("Removed from cart");
        return true;

    } catch (e) {
        console.log("Couldn't remove from cart");
        console.error(e);
        return false;
    }
}

export default removeFromCart;
