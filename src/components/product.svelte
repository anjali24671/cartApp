<script>
    import cart from "../store/cartStore"
    import addToCart from '../utils/addToCart.js'
    import removeFromCart from '../utils/removeFromCart.js'
    import { onMount } from "svelte";

	export let book

    let addedToCart

    onMount(()=>{
        // check if product is in LS
        const cartItems = localStorage.getItem('cart')
        let cartItemsArr 
        if (cartItems){
            cartItemsArr = JSON.parse(cartItems)

            if (cartItemsArr.includes(book.id)) addedToCart = true
            else addedToCart = false
        }
    })

    

    function cartOperation(id){
        if (!addedToCart) addedToCart = addToCart(id)
        else addedToCart = removeFromCart(id)
        
        console.log($cart)

    }

  
  
</script>

<section class="flex  w-[290px] rounded-md overflow-hidden justify-center h-[160px] border-2 hover:border-3 hover:border-orange-600">
    <div class="w-[200px]">
        <img class="object-cover h-full" alt={book.name} src={book.photoURL}/>
    </div>
    <div class="w-full flex flex-col justify-between">
       <div class="px-3 font-semibold flex flex-col gap-1 pt-[5px]">
            <h3>{book.name}</h3>
            <h4 class="text-xs">Paperback: <span class="font-bold"> ₹{book.price}</span></h4>
            <div class="text-xs">{book.language}</div>
       </div>
       <div class="text-sm font-semibold text-orange-600 flex py-1 border-t border-gray-200 justify-center">
            <button on:click={()=>cartOperation(book.id)} class="active:text-orange-400">
                {#if addedToCart}
                    Remove
                {:else}
                    Add To Cart
                {/if}
            </button>
       </div>
    </div>
</section>