<script>
    import '../app.css';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import cart from '../store/cartStore';

    // Userfront 
    import { PUBLIC_USERFRONT_ACCOUNT_ID } from '$env/static/public';
    import Userfront from '@userfront/toolkit/web-components';
    Userfront.init(PUBLIC_USERFRONT_ACCOUNT_ID);

    const { user } = Userfront;
    


    let cartCount = 0;
    let cartItems = [];
    $:loadingCart = false;



    onMount(async () => {

        loadingCart = true;
        // Get the products from localStorage 
        const prevLocalCart = localStorage.getItem('cart');
        let localCartArr;

        if (prevLocalCart) {
            localCartArr = JSON.parse(localStorage.getItem('cart'));
        } else {
            localCartArr = [];
        }

        // Subscribe to cart updates
        cart.subscribe(value => {
            cartItems = Array.from(value);
            cartCount = cartItems.length;
        });

        const localCartSet = new Set(localCartArr);
        cart.set(localCartSet);
       

        // If the user is logged in, get the products from database and merge them with localStorage
        if (user.email) {
            
            await serverToLocalCart(localCartSet);
            
        }

        // Initialize the cart store with the products in localStorage (and Backend)
        cart.set(localCartSet);
        loadingCart = false;


    });

    // function to merge server cart with local storage cart
    async function serverToLocalCart(localCartSet) {
        try {
            const response = await fetch(`api/cart?user_id=${user.userUuid}`);
            const data = await response.json();

            // Merge the server cart with the local cart
            data.forEach(item => localCartSet.add(item));
        } catch (error) {
            console.error("Error fetching user cart:", error);
        }
    }
</script>



{#if loadingCart}
<h1>loading please wait...</h1>
{:else}

<!-- NAVBAR SECTION -->
<header class="flex items-center justify-between p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
    <!-- LOGO  -->
    <div class="flex items-center">
        <a href="/" class="text-2xl font-bold text-gray-800">The Store</a>
    </div>

    <!-- CART AND SIGNUP  -->
    <div class="flex items-center space-x-4">
        <!-- AUTHENTICATION -->
        {#if user.email}
            <button on:click={()=>goto('/dashboard')} class="w-[23px] rounded-[50%] overflow-hidden">
                <img alt="user" src={user.image} />
            </button>
        {:else}
            <button on:click={()=>goto('/login')} class="bg-orange-200 py-1 px-2 rounded-md hover:bg-orange-300">Log In</button>
            <button on:click={()=>goto('/signup')} class="bg-orange-200 py-1 px-2 rounded-md hover:bg-orange-300">Sign Up</button>
        {/if}
        
        <!-- CART -->
        <button class="text-gray-800 hover:text-black transition relative" on:click={() => goto('/cart')}>
            <a href="/cart">
                <svg class=" fill-current" xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19">
                    <path d="M8.094 14.263h11.568a.8.8 0 0 0 .567-.223.74.74 0 0 0 .241-.569.74.74 0 0 0-.241-.568.8.8 0 0 0-.567-.223H8.293a.85.85 0 0 1-.63-.243 1.13 1.13 0 0 1-.304-.64L5.763 1.188Q5.67.599 5.37.299 5.07 0 4.272 0H.83a.8.8 0 0 0-.577.243A.78.78 0 0 0 0 .822q0 .334.252.573t.577.238h3.244L5.627 11.99q.168 1.056.76 1.664.594.609 1.707.609m-1.785-3.47h13.405q1.124 0 1.717-.613.593-.615.76-1.68l.767-4.94.026-.202A1.4 1.4 0 0 0 23 3.175q0-.375-.268-.614-.267-.238-.73-.238H5.428l.021 1.572h15.673l-.661 4.443a1.16 1.16 0 0 1-.29.635q-.225.237-.624.238l-13.248.01zM8.881 19q.714 0 1.197-.472.482-.472.482-1.14 0-.67-.482-1.142-.483-.472-1.197-.472-.693 0-1.181.472a1.53 1.53 0 0 0-.488 1.141q0 .67.488 1.141.488.472 1.18.472m9.248 0q.693 0 1.181-.472t.488-1.14-.488-1.142a1.64 1.64 0 0 0-1.18-.472q-.694 0-1.192.472a1.5 1.5 0 0 0-.499 1.141q0 .67.499 1.141.499.472 1.191.472"></path>
                </svg>
                {#if cartCount > 0}
                    <div class="absolute flex items-center justify-center rounded-full text-xs bg-red-600 text-white w-[15px] h-[15px] top-[-10px] right-[-4px]">
                        {cartCount}
                    </div>
                {/if}
            </a>
        </button>
    </div>
</header>

<main class="pt-[80px]">
  <slot {loadingCart} />
</main>

{/if}