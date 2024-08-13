<script>

    export let qty = 1
</script>

<div class="flex items-center justify-center bg-yellow-400 w-[79px] border-gray-600 rounded-[4px] overflow-hidden">
    
    <button on:click={() => {
        if(qty > 1) qty--
    }} class="px-2 text-xl font-semibold">-</button>

    <div class="px-2">{qty}</div>
    <button on:click={() => {
        if(qty < 9) qty++
    }} class=" px-2 text-xl font-semibold">+</button>
</div>