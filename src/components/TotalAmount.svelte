<script>
    export let totalMRP = 0
    export let itemCount = 0
    let shippingFees = 90
    let platformFees = 20
    let discountMRP = 10

    function getTotalAmount(){
        return totalMRP - discountMRP + platformFees + shippingFees
    }
</script>


<section class="flex mt-[87px] flex-col p-3 justify-around border border-gray-500 w-[300px] h-[300px]">
   
    <div>
        <h3>Order Summary ({itemCount} items)</h3>
    </div>
    <div class="flex justify-between items-center">
        <p>Total MRP</p><p> {totalMRP}</p>
    </div>
    <div class="flex justify-between items-center">
        <p>Discount on MRP</p><p> -{discountMRP}</p>
    </div>
    <div class="flex justify-between items-center">
        <p>Platform Fees</p><p> {platformFees}</p>
    </div>
    <div class="flex justify-between items-center">
        <p>Shipping Fees</p><p> 
            {#if !shippingFees}
                FREE
            {:else}
                {shippingFees}
            {/if}
        </p>
    </div>
    <hr>
    <div class="flex mt-[-10px] justify-between items-center">
        <p>Total amount</p><p>{getTotalAmount()}</p>
    </div>

    <button class="w-full py-1 bg-green-300">Place Order</button>
    

    
</section>