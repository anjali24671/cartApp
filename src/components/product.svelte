<script>
    import cart from "../store/cartStore"
    import addToCart from '../utils/addToCart.js'
    import removeFromCart from '../utils/removeFromCart.js'
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";

	export let book

    let addedToCart
    const dispatch = createEventDispatcher()

    onMount(()=>{

        // Check if this product is in Local Storage (added to cart)
        const cartItems = localStorage.getItem('cart')
        let cartItemsArr 
        if (cartItems){
            cartItemsArr = JSON.parse(cartItems)

            if (cartItemsArr.includes(book.id)) addedToCart = true
            else addedToCart = false
        }
    })


    function cartOperation(id){

        // Add product to cart
        if (!addedToCart){ 
            addedToCart = addToCart(id)
            if(addedToCart){
               
                dispatch('add', {"message": "added to cart", 'status':true})
            }else{
                dispatch('added', {"message": "Couldn't add to the cart", "status": false})     
            }
        }

        // remove product from cart
        else{ 
            addedToCart = removeFromCart(id)
            if(!addedToCart){
                dispatch('remove', {"message": "removed from cart", 'status':true})     
            }else{
                dispatch('remove', {"message": "Couldn't remove from the cart", 'status':false})       
            }
        }
        console.log($cart)
    }

  
  
</script>


<!-- PRODUCT -->
<section class="flex gap-3 w-[290px] p-2 border hover:bg-gray-100 rounded-sm items-start">
    <!-- IMAGE -->
    <div class="w-[70%]">
        <img class="object-contain rounded-lg" alt={book.name} src={book.photoURL}/>
    </div>

    <!-- DESCRIPTION -->
    <div class="flex h-full flex-col justify-between items-start w-full">
       <div class="flex flex-col gap-1 items-start">
            <h3 class="font-bold">{book.name}</h3>
            <h4 class="text-xs">Paperback: <span class="font-bold"> ₹{book.price}</span></h4>  
            <span class="text-xs bg-gray-300 px-1 text-start">{book.language}</span>  
       </div>

       <!-- ADD TO CART BUTTON -->
       <div class="w-full text-center border-t  ">
            <button on:click={()=>cartOperation(book.id)} class=" text-sm font-semibold text-orange-600 hover:text-orange-500 active:orange-400">
                {#if addedToCart}
                    Remove
                {:else}
                    Add To Cart
                {/if}
            </button>
       </div>
    </div>
</section>