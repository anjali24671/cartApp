<script>
	import {goto} from '$app/navigation'
    import coupons from '../data/discountCoupon'
    import cart from '../store/cartStore'

    import { PUBLIC_USERFRONT_ACCOUNT_ID } from '$env/static/public';
    import Userfront from '@userfront/toolkit/web-components';
    Userfront.init(PUBLIC_USERFRONT_ACCOUNT_ID);
    const { user } = Userfront;

    export let totalMRP = 0;
    export let itemCount = 0;
    let shippingFees = 20;
    let platformFees = 0;
    let discountMRP = 10;
    let coupon
    $:couponDiscount = 0
    $:couponError = false

    $: totalAmount = totalMRP - discountMRP + platformFees + shippingFees - couponDiscount
 


    function applyCoupon(){
       const couponValue = coupon.value

       if (coupons.hasOwnProperty(couponValue)){
        couponError = false
        couponDiscount = coupons[couponValue]
       }
       else{
        couponError = true
        couponDiscount = 0
       }
       
       
    }
    
    // Merge the local storage cart and user's cart
    async function merge(){
        const ids = Array.from($cart);

        // If user is logged in merge the local storage to user cart
        if(user.email){
            const res = await fetch('api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ids, 'user_id': user.userUuid}),
            })

            // merge the user cart to localstorage
            const data = await res.json()
        }

        // If user is not logged in
        else{
            goto('/signup')
        }
        
        
        
    }


</script>

<section class="flex flex-col p-5 bg-white shadow-lg rounded-lg border border-gray-200 w-[300px] ">
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
    <!-- DISCOUNT COUPON -->
    <div class="flex items-end gap-2 items-center my-1 ">
        <input bind:this={coupon} placeholder="DISCOUNT COUPON" class="text-sm p-2 accent-orange-200 bg-orange-100 w-full font-medium text-gray-800">
        <button on:click={applyCoupon} class="bg-orange-400 text-white rounded-sm font-semibold py-1 px-2">Apply</button>
    </div>

    <div class="flex flex-col mb-2">
        {#if couponDiscount}
            <div class="flex justify-between my-2 items-center">
                <p class="text-sm text-gray-600">Coupon Discount</p><p class="text-sm font-medium text-gray-800">-₹{couponDiscount}</p>
            </div>
        {/if}
        {#if couponError}
            <p class="text-xs text-red-600">Invalid Coupon</p>
        {/if}
    </div>
    <hr class="border-gray-300 mb-4">
    <div class="flex justify-between items-center mb-6">
        <p class="text-lg font-semibold text-gray-700">Total Amount</p><p class="text-lg font-semibold text-gray-800">₹{totalAmount}</p>
    </div>
    <button on:click={merge} class="w-full py-2 text-white bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition duration-200 ease-in-out">Place Order</button>
</section>
