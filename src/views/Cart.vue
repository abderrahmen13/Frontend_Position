<template>
    <div v-if="recipes.length <= 0">
        <h1>Your cart</h1>
        <div v-if="items.length > 0">
            <CartItemCard
            v-for="item in items"
            :key="item.id"
            :item="item" />
            <div class="cart-item-card">
                <button class="view-product-button" @click.prevent="checkout()">Checkout</button>
            </div>
        </div>
        <div v-else style="color:red;">
            <h1>No products yet!</h1>
        </div>
    </div>
    <div v-else>
        <div class="product-cards-container">
            <div class="card" v-for="(item, i) in recipes" :key="i" :product="item">
                <h3>
                    {{ item.title }}
                </h3>
                <img :src="item.image" :alt="item.title">
                <p style="text-align:left;color:red;"><b>missed Ingredient Count:</b></p>
                <ol>
                    <li v-for="(missedIngredient, j) in item.missedIngredients" :key="j">
                        {{missedIngredient.original}} <img :src="missedIngredient.image" style="width:20px">
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
import CartItemCard from '../components/cart/CartItemCard.vue'
import axios from 'axios';

export default {
    components: {
        CartItemCard
    },
    data() {
        return {
            recipes: [],
            product: null,
            active: {
                product_drawer: false
            }
        }
    },
    computed: {
        items() {
            return this.$store.getters.cartItems
        }
    },
    methods: {
        //Checkout button display recommended recipes
        checkout() {
            var ingredients = ""
            this.items.forEach(element => {
                ingredients = ingredients + element.title + ",+"
            });
            console.log(ingredients)
            axios.get('https://api.spoonacular.com/recipes/findByIngredients?apiKey=9f3af0f0604642ed81d0a40533a36934&ingredients='+ingredients+'&number=3').then((response) => {
                this.recipes = response.data;
                //Empty the cart
                localStorage.removeItem('cart')
            });
        },
        viewRecipe(product) {
            this.product = product
            this.active.product_drawer = true
        },
        closeProductDrawer() {
            this.active.product_drawer = false
        }
    },
}
</script>