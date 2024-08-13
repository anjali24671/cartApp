<script>
    import cart from "../../store/cartStore";
    import Product from "../../components/product.svelte";
    import books from "../../data/books";

    function getBookFromCart(){
        let book = []
        let ids = Array.from($cart)

        for (let id of ids){
            book.push(books.filter(book=> book.id===id)[0])
        }
        return book
    }

    let cartBooks = getBookFromCart()

</script>

<main class="flex flex-col px-9 items-start gap-6">
    {#if cartBooks.length > 0}
        <h1 class="text-[25px] font-semibold">My Cart</h1>
        <h3 class="mt-[-20px]">{cartBooks.length} {cartBooks.length === 1? `Book`: `Books`} in your cart</h3>
    {/if}
    <div class="flex w-full items-start justify-start">
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {#if cartBooks.length > 0}
                {#each cartBooks as book}
                    <Product {book}/>
                {/each}
            {:else}
                <p>Your cart is empty</p>
            {/if}
        </section>
    </div>
  
</main>

