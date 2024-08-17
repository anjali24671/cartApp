<script>
    import cart from "../../store/cartStore";
    import books from "../../data/books";
    import CartProduct from "../../components/CartProduct.svelte";
    import TotalAmount from "../../components/TotalAmount.svelte";


    // // userfront
    // import { PUBLIC_USERFRONT_ACCOUNT_ID } from '$env/static/public';
    // import Userfront from '@userfront/toolkit/web-components';
    // Userfront.init(PUBLIC_USERFRONT_ACCOUNT_ID);

    const { user } = Userfront;
    let totalMRP = 0;
    let itemCount = 0;
    let cartBooks = [];

    // Load book calculate the total amount initially
    async function getBookFromCart() {
        let ids = Array.from($cart);

        // if the user is logged in, also get the database's cart items
        if (user.email) {
            try {
                const response = await fetch(`/api/cart?user_id=${user.userUuid}`);
                const userCartRes = await response.json();

                ids = [...ids, ...userCartRes]; // Merge the arrays
            } catch (error) {
                console.error('Error fetching user cart:', error);
            }
        }

        // Use a Set to ensure unique IDs
        const uniqueIds = Array.from(new Set(ids));

        // Populate cartBooks with the unique books found in uniqueIds
        cartBooks = uniqueIds.map(id => {
            const book = books.find(b => b.id === id);
            return { ...book, quantity: 1 }; // default quantity is 1
        });
        calculateTotal(); // Calculate the total amount after updating cartBooks
    }


    // Function to calculate the total price of products according to their qunatities
    function calculateTotal() {
        totalMRP = 0;
        cartBooks.forEach(book => {
            totalMRP += book.price * book.quantity;
        });
        itemCount = cartBooks.length; // Update item count
    }

    // If qty of a product changes, update the total price
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

    // Use the reactive statement to call getBookFromCart when the cart changes
    $: {
        console.log($cart);
        getBookFromCart(); 
    }
</script>


<main class="flex flex-col items-center px-6 py-2">
    <div class="flex flex-col md:w-[70%] ">
        
        <!-- TITLE -->
        {#if cartBooks.length > 0}
        <div class="mb-6 text-start">
            <h1 class="text-2xl font-semibold mb-1">My Cart</h1>
            <h3 class="text-md">{cartBooks.length} {cartBooks.length === 1 ? `Book` : `Books`} in your cart</h3>
        </div>
        {/if}
        
        <!-- MAIN SECTION -->
        <div class="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">

            <!-- PRODUCTS IN CART -->
            <section class="flex-1 w-full">
                {#if cartBooks.length > 0}
                    <div class="space-y-4">
                        {#each cartBooks as book (book.id)}
                            <hr>
                            <CartProduct on:changeQty={updateTotalMRP} {book}/>
                          
                        {/each}
                    </div>
                {:else}
                    <p class="text-center">Your cart is empty</p>
                {/if}
            </section>

            <!-- ORDER SUMMARY -->
            {#if cartBooks.length > 0}
                <div class="w-full  max-w-xs flex-shrink-0">
                    <TotalAmount {totalMRP} {itemCount}/>
                </div>
            {/if}
        </div>
    </div>
</main>
