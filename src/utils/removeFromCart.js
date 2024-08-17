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

        }
        console.log("hello")

        return false;

    } catch (e) {
        console.error(e);
        return true;
    }
}

export default removeFromCart;
