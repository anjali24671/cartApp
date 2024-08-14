<script>
    import Quantity from "./Quantity.svelte";
    import removeFromCart from '../utils/removeFromCart.js';
    import { createEventDispatcher } from "svelte";

    export let book;

    const dispatch = createEventDispatcher();
    console.log(book.quantity)
    let currentQuantity = book.quantity;

    function quantityHandler(event) {
        const type = event.detail.typeOfChange;

        if (type === 'increment') {
            currentQuantity++;
        } else if (type === 'decrement' && currentQuantity > 1) {
            currentQuantity--;
        }

        dispatch('changeQty', { bookId: book.id, newQuantity: currentQuantity });
    }

    function handleRemove() {
        removeFromCart(book.id);
        dispatch('changeQty', { bookId: book.id, newQuantity: 0 });
    }
</script>

<section class="flex p-3 overflow-hidden rounded-md h-[170px] border border-gray-400 relative">
    <div class="absolute top-3 right-3">
        <button on:click={handleRemove} class="text-gray-600 hover:text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path fill="#000" fill-rule="evenodd" d="M9.031 8l6.756-6.756a.731.731 0 0 0 0-1.031.732.732 0 0 0-1.031 0L8 6.969 1.244.213a.732.732 0 0 0-1.031 0 .731.731 0 0 0 0 1.03L6.969 8 .213 14.756a.731.731 0 0 0 0 1.031.732.732 0 0 0 1.031 0L8 9.031l6.756 6.756a.732.732 0 0 0 1.031 0 .731.731 0 0 0 0-1.03L9.031 8z"/>
            </svg>
        </button>
    </div>

    <div class="flex w-[180px]">
        <img class="object-cover rounded-[4px] h-full" alt={book.name} src={book.photoURL} />
    </div>
    <div class="flex flex-col justify-between w-full">
        <div class="font-semibold flex flex-col gap-1">
            <h3>{book.name}</h3>
            <h4 class="text-xs">Paperback: <span class="font-bold"> ₹{book.price}</span></h4>
            <div class="text-xs">{book.language}</div>
        </div>
        <div class="text-sm self-start font-semibold text-orange-600 flex py-1 justify-center gap-5">
            <Quantity on:quantityChange={quantityHandler} />
        </div>
    </div>
</section>
