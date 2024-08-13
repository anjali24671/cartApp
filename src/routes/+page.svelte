<script>
    import Product from "../components/Product.svelte";
    import books from "../data/books.js"
</script>



<section class="flex overflow-hidden my-[50px] md:mx-[40px]  items-center justify-center md:justify-start ">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {#each books as book}
            <Product {book}/>
        {/each}
    </div>
</section>


<!-- 
<div class="p-3 rounded-xl bg-green-400  fixed right-[10px] top-[50px]">
    Item Added to Cart Successfully!
</div> -->

