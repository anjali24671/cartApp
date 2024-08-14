<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function emitQtyEvent(typeOfChange){
        dispatch("quantityChange", {'qty':qty, 'typeOfChange': typeOfChange})
    }

    export let qty = 1
</script>

<div class="flex items-center justify-center bg-yellow-400 w-[79px] border-gray-600 rounded-[4px] overflow-hidden">
    
    <button on:click={() => {
        if(qty > 1) qty--
        emitQtyEvent('decrement')
    }} class="px-2 text-xl font-semibold">-</button>

    <div class="px-2">{qty}</div>

    <button on:click={() => {
        if(qty < 9) qty++
        emitQtyEvent('increment')
    }} class=" px-2 text-xl font-semibold">+</button>
</div>