<script>
	export let book
</script>

<section class="flex  w-[260px] rounded-md overflow-hidden justify-center h-[160px] border-2 hover:border-3 hover:border-orange-600">
    <div class="w-[200px]">
        <img class="object-cover h-full" src={book.photoURL}/>
    </div>
    <div class=" w-full flex flex-col justify-between">
       <div class="px-3 font-semibold flex flex-col gap-1 pt-[5px]">
            <h3>{book.name}</h3>
            <h4 class="text-xs">Paperback: <span class="font-bold"> ₹{book.price}</span></h4>
            <div class="text-xs">{book.language}</div>
       </div>
       <div class="text-sm font-semibold text-orange-600 flex py-1 border-t border-gray-200 justify-center">
            <button>Add To Cart</button>
       </div>
    </div>
</section>