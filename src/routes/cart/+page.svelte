<script>
    import cart from "../../store/cartStore";
    import books from "../../data/books";
    import CartProduct from "../../components/CartProduct.svelte";
    import TotalAmount from "../../components/TotalAmount.svelte";


    function getBookFromCart(){
        let book = []
        let ids = Array.from($cart)

        for (let id of ids){
            book.push(books.filter(book=> book.id===id)[0])
        }
        return book
    }
   
    let cartBooks = []

    $: {
        console.log('Current cart:', $cart);
        console.log('cartBooks is updating');
        cartBooks = getBookFromCart();
    }


</script>

<main class="flex px-7 justify-between">
    <div class="flex  flex-col  items-start gap-6">
        {#if cartBooks.length > 0}
            <h1 class="text-[25px] font-semibold">My Cart</h1>
            <h3 class="mt-[-20px]">{cartBooks.length} {cartBooks.length === 1? `Book`: `Books`} in your cart</h3>
        {/if}
        <div class="flex w-full items-start justify-start">
            <section class="grid grid-cols-1 gap-3">
            
                {#if cartBooks.length > 0}
                    {#each cartBooks as book}
                        <CartProduct {book}/>
                    {/each}
                {:else}
                    <p>Your cart is empty</p>
                {/if}
            </section>
        </div>

    </div>
    <TotalAmount/>
   
</main>

