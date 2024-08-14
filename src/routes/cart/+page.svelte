<script>
    import cart from "../../store/cartStore";
    import books from "../../data/books";
    import CartProduct from "../../components/CartProduct.svelte";
    import TotalAmount from "../../components/TotalAmount.svelte";

    let totalMRP = 0;
    let itemCount = 0;
    let cartBooks = [];

    function getBookFromCart() {
        const ids = Array.from($cart);
        cartBooks = ids.map(id => {
            const book = books.find(b => b.id === id);
            return { ...book, quantity: 1 }; // default quantity is 1
        });

        calculateTotal();
        return cartBooks;
    }

    // Function to calculate the total price and item count
    function calculateTotal() {
        totalMRP = 0;

        cartBooks.forEach(book => {
            totalMRP += book.price * book.quantity;
            
        });
    }

    function updateTotalMRP(event) {
        const { bookId, newQuantity } = event.detail;
        const book = cartBooks.find(book => book.id === bookId);

        if (book) {
            book.quantity = newQuantity;

            // Remove the book from the cart if the quantity is 0
            if (book.quantity === 0) {
                cartBooks = cartBooks.filter(b => b.id !== bookId);
            }
        }

        calculateTotal();
    }

    $: {
        console.log($cart)
        cartBooks = getBookFromCart();
        itemCount = cartBooks.length
    }
</script>

<main class="flex flex-col items-center justify-center px-7 py-6">
    <div class="flex flex-col">
        <!-- Header Section -->
        {#if cartBooks.length > 0}
        <div class="mb-6 text-start">
            <h1 class="text-2xl font-semibold mb-1">My Cart</h1>
            <h3 class="text-lg">{cartBooks.length} {cartBooks.length === 1 ? `Book` : `Books`} in your cart</h3>
        </div>
        {/if}

        <!-- Main Content Section -->
        <div class="flex flex-wrap justify-between gap-6">
            <!-- Cart Items Section -->
            <section class="flex-1 max-w-2xl">
                {#if cartBooks.length > 0}
                    <div class="space-y-6">
                        {#each cartBooks as book}
                            <CartProduct on:changeQty={updateTotalMRP} {book}/>
                        {/each}
                    </div>
                {:else}
                    <p class="text-center">Your cart is empty</p>
                {/if}
            </section>

            <!-- Total Amount Section -->
            <div class="w-full max-w-xs flex-shrink-0">
                <TotalAmount {totalMRP} {itemCount}/>
            </div>
        </div>
    </div>
</main>
