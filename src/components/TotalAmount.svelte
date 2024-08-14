<script>
    export let totalMRP = 0;
    export let itemCount = 0;
    let shippingFees = 0;
    let platformFees = 0;
    let discountMRP = 0;

    $: totalAmount = totalMRP - discountMRP + platformFees + shippingFees


</script>

<section class="flex flex-col p-5 bg-white shadow-lg rounded-lg border border-gray-200 w-[300px] h-[300px]">
    <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-700">Order Summary ({itemCount} items)</h3>
    </div>
    <div class="flex justify-between items-center mb-2">
        <p class="text-sm text-gray-600">Total MRP</p><p class="text-sm font-medium text-gray-800">₹{totalMRP}</p>
    </div>
    <div class="flex justify-between items-center mb-2">
        <p class="text-sm text-gray-600">Discount on MRP</p><p class="text-sm font-medium text-green-600">-₹{discountMRP}</p>
    </div>
    <div class="flex justify-between items-center mb-2">
        <p class="text-sm text-gray-600">Platform Fees</p><p class="text-sm font-medium text-gray-800">₹{platformFees}</p>
    </div>
    <div class="flex justify-between items-center mb-4">
        <p class="text-sm text-gray-600">Shipping Fees</p>
        <p class="text-sm font-medium text-gray-800">
            {#if !shippingFees}
                FREE
            {:else}
                ₹{shippingFees}
            {/if}
        </p>
    </div>
    <hr class="border-gray-300 mb-4">
    <div class="flex justify-between items-center mb-6">
        <p class="text-lg font-semibold text-gray-700">Total Amount</p><p class="text-lg font-semibold text-gray-800">₹{totalAmount}</p>
    </div>
    <button class="w-full py-2 text-white bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition duration-200 ease-in-out">Place Order</button>
</section>
