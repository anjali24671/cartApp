<script>
    import Quantity from "./Quantity.svelte";
    import removeFromCart from '../utils/removeFromCart.js';
    import { createEventDispatcher } from "svelte";

    export let book;

    const dispatch = createEventDispatcher();
    let currentQuantity = book.quantity;


    // Change quantity of product in cart
    function quantityHandler(event) {
        const type = event.detail.typeOfChange;

        if (type === 'increment') {
            currentQuantity++;
        } else if (type === 'decrement' && currentQuantity > 1) {
            currentQuantity--;
        }

        dispatch('changeQty', { bookId: book.id, newQuantity: currentQuantity });
    }

    // Remove product from cart 
    function handleRemove() {
        removeFromCart(book.id);
        dispatch('changeQty', { bookId: book.id, newQuantity: 0 });
    }
</script>


<!-- PRODUCT -->
<section class="flex p-1 overflow-hidden h-[120px] w-full  relative">



    <!-- IMAGE -->
    <div class="flex w-[110px] mr-[10px] sm:mr-[0px]">
        <img class="object-cover rounded-[4px] h-full" alt={book.name} src={book.photoURL} />
    </div>

    <!-- DESCRIPTION -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center pr-3 justify-between w-full">
        <div class="font-semibold w-[200px] flex flex-col gap-1">
            <h3>{book.name}</h3>
            <h4 class="text-xs">Paperback: <span class="font-bold"> ₹{book.price}</span></h4>
            <div class="text-xs">{book.language}</div>
        </div>

        <!-- QTY CHANGER -->
        <div class="text-sm font-semibold flex py-1 justify-center gap-5">
            <Quantity on:quantityChange={quantityHandler} />
        </div>

            
        <!-- REMOVE ITEM FOR BIG SCREEN -->
        <div class="sm:block hidden ">
            <button on:click={handleRemove} class="text-gray-600 hover:text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path fill="#000" fill-rule="evenodd" d="M9.031 8l6.756-6.756a.731.731 0 0 0 0-1.031.732.732 0 0 0-1.031 0L8 6.969 1.244.213a.732.732 0 0 0-1.031 0 .731.731 0 0 0 0 1.03L6.969 8 .213 14.756a.731.731 0 0 0 0 1.031.732.732 0 0 0 1.031 0L8 9.031l6.756 6.756a.732.732 0 0 0 1.031 0 .731.731 0 0 0 0-1.03L9.031 8z"/>
                </svg>
            </button>
        </div>

    </div>

    <!-- REMOVE ITEM FOR SMALL SCREEN -->
    <div class="sm:hidden ">
        <button on:click={handleRemove} class="text-gray-600 hover:text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path fill="#000" fill-rule="evenodd" d="M9.031 8l6.756-6.756a.731.731 0 0 0 0-1.031.732.732 0 0 0-1.031 0L8 6.969 1.244.213a.732.732 0 0 0-1.031 0 .731.731 0 0 0 0 1.03L6.969 8 .213 14.756a.731.731 0 0 0 0 1.031.732.732 0 0 0 1.031 0L8 9.031l6.756 6.756a.732.732 0 0 0 1.031 0 .731.731 0 0 0 0-1.03L9.031 8z"/>
            </svg>
        </button>
    </div>


</section>
