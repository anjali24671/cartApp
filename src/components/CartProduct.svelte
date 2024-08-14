<script>
    import Quantity from "./Quantity.svelte";
    import removeFromCart from '../utils/removeFromCart.js'
    import cart from '../store/cartStore'


    export let book

    let prevPrice = book.price
    let currentPrice = book.price

    function quantityHandler(event){
        const qty = event.detail.qty
        const type = event.detail.typeOfChange

        console.log(qty)

        if( type==='increment'){
            currentPrice = currentPrice + prevPrice 
        }
        else{ 
            currentPrice = currentPrice - prevPrice
        }
        
        console.log(currentPrice)
    }

    function handleRemove(){
        removeFromCart(book.id)
        console.log($cart)
    }
    


</script>

<section class="flex p-3 overflow-hidden justify-center h-[170px] hover:bg-gray-600 border border-gray-500 ">
    <div class="w-[180px]">
        <img class="object-cover rounded-[4px] h-full" alt={book.name} src={book.photoURL}/>
    </div>
    <div class="w-full flex flex-col">
       <div class="font-semibold flex flex-col gap-2 pt-[5px]">
            <h3>{book.name}</h3>
            <h4 class="text-xs">Paperback: <span class="font-bold"> ₹{book.price}</span></h4>
            <div class="text-xs">{book.language}</div>
       </div>
       <div class="text-sm self-start font-semibold text-orange-600 flex py-1 justify-center gap-5">
           <Quantity on:quantityChange={quantityHandler}/>
       </div>
    </div>
    <div>
        <button on:click={handleRemove}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="itemContainer-base-closeIcon"><path fill="#000" fill-rule="evenodd" d="M9.031 8l6.756-6.756a.731.731 0 0 0 0-1.031.732.732 0 0 0-1.031 0L8 6.969 1.244.213a.732.732 0 0 0-1.031 0 .731.731 0 0 0 0 1.03L6.969 8 .213 14.756a.731.731 0 0 0 0 1.031.732.732 0 0 0 1.031 0L8 9.031l6.756 6.756a.732.732 0 0 0 1.031 0 .731.731 0 0 0 0-1.03L9.031 8z" style="--darkreader-inline-fill: #e8e6e3;" data-darkreader-inline-fill=""></path></svg>
        </button>
    </div>
</section>