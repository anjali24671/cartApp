<script>
    import { createEventDispatcher } from "svelte";

    export let qty = 1;

    const dispatch = createEventDispatcher();

    // Tell the parent that the qty has changed
    function emitQtyEvent(typeOfChange){
        dispatch("quantityChange", {'qty': qty, 'typeOfChange': typeOfChange});
    }

   
</script>


<!-- QUANTITY COMPONENT -->
<div class="flex items-center justify-center bg-orange-400 w-[79px] border-orange-600 rounded-[4px] overflow-hidden">

    <!-- DECREASE QTY -->
    <button on:click={() => {
        if(qty > 1) qty--;
        emitQtyEvent('decrement');
    }} class="px-2 text-xl font-semibold text-white">-</button>

    <!-- CURRENT QTY -->
    <div class="px-2 text-white">{qty}</div>

    <!-- INCREASE QTY -->
    <button on:click={() => {
        if(qty < 9) qty++;
        emitQtyEvent('increment');
    }} class="px-2 text-xl font-semibold text-white">+</button>
</div>
