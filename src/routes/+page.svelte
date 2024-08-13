<script>
    import Product from "../components/product.svelte";
    import books from "../data/books.js"
    console.log(books)
</script>

<section class="flex my-[50px] md:mx-[40px] fex-col w-full items-center justify-center md:justify-start ">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {#each books as book}
            <Product {book} />
        {/each}
    </div>
</section>

