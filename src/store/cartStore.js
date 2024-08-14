import { writable } from "svelte/store";

// // get items from local storage
// const cartItemsArr = JSON.parse(localStorage.getItem('cart')) || []
// const cartItemsSet = new Set(cartItemsArr)
// const cart = writable(cartItemsSet)

const cart = writable(new Set())
export default cart