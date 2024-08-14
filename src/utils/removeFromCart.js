import cart from "../store/cartStore";

function removeFromCart(id) {
    try {
        // remove product from cart store
        cart.update(items => {
            items.delete(id);
            return items;
        });

        // remove product from localstorage as well
        if (typeof window !== undefined) {
            const cartItemArr = JSON.parse(localStorage.getItem('cart'))

            const cartItemSet = new Set(cartItemArr)

            cartItemSet.delete(id)

            localStorage.setItem('cart', JSON.stringify(Array.from(cartItemSet)))
            console.log("item removed from LS : ", localStorage.getItem('cart'))

        }


        console.log("Removed from cart");
        return false;

    } catch (e) {
        console.log("Couldn't remove from cart");
        console.error(e);
        return true;
    }
}

export default removeFromCart;
