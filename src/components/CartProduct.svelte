<script>
    import Quantity from "./Quantity.svelte";
    import removeFromCart from '../utils/removeFromCart.js'
    import cart from '../store/cartStore'


    export let book
    function handleRemove(){
        removeFromCart(book.id)
        console.log($cart)
    }


</script>

<section class="flex p-3  rounded-md overflow-hidden justify-center h-[170px]  hover:bg-gray-600">
    <div class="w-[180px]">
        <img class="object-cover rounded-[4px] h-full" alt={book.name} src={book.photoURL}/>
    </div>
    <div class="w-full flex flex-col">
       <div class="font-semibold flex flex-col gap-2 pt-[5px]">
            <h3>{book.name}</h3>
            <h4 class="text-xs">Paperback: <span class="font-bold"> ₹{book.price}</span></h4>
            <div class="text-xs">{book.language}</div>
       </div>
       <div class="text-sm self-start font-semibold text-orange-600 flex py-1 justify-center gap-5">
           <button on:click={handleRemove}>REMOVE</button>
           <Quantity/>
       </div>
    </div>
</section>