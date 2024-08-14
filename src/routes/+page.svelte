<script>
    import Product from "../components/Product.svelte";
    import books from "../data/books.js"
    import { fade } from 'svelte/transition';

    let showSucess = false
    let showFailure = false

    // shows green div when item is added to cart
    function showCartSuccess(detail){
        showSucess = true

        setTimeout(()=>{
            showSucess = false
        }, 2000)
    }

    // shows red div when item is removed from cart
    function showCartFailure(detail){
        showFailure = true 

        setTimeout(()=>{
            showFailure = false
        }, 2000)
    }

    function itemAddHandler(event){
        showCartSuccess(event.detail)
    }

    function itemRemoveHandler(event){
        showCartFailure(event.detail)
    }

</script>

<!-- APPEARS WHEN ITEMS ARE ADDED OR REMOVED FROM CART -->
<div class="flex w-full relative items-center justify-center">
    {#if showSucess}
        <div class="p-3 rounded-xl bg-green-400  fixed  bottom-[20px]" transition:fade>
            Item Added to Cart Successfully!
        </div>
    {:else if showFailure}
        <div class="p-3 rounded-xl bg-red-400  fixed  bottom-[20px]" transition:fade>
            item removed from the cart
        </div>
    {/if}
</div>

<!-- MAIN PRODUCTS SECTION -->
<section class="flex overflow-hidden my-[50px] md:mx-[40px]  items-center justify-center md:justify-start ">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {#each books as book}
            <Product on:add={itemAddHandler} on:remove={itemRemoveHandler} {book}/>
        {/each}
    </div>
</section>


