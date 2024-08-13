import { writable } from "svelte/store";

const cart = writable(new Set())


export default cart