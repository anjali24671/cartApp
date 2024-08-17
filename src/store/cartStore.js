import { writable } from "svelte/store";


// This cart will store the IDs of products
const cart = writable(new Set())
export default cart