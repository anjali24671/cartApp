import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    cart_items: {
        type: [{ type: Number}],
        default:[],
        required: true
    }
})


const Cart = mongoose.model('Cart', CartSchema);

export default Cart
