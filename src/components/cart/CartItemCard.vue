<template>
    <div class="cart-item-card">
        <div class="header">
            <h3>{{ item.title }}</h3>
            <img :src="item.image" :alt="item.title">
        </div>
        <button class="remove-product-button" @click.prevent="removeFromCart()">Remove</button>
    </div>
</template>

<script>
    export default {
        props: ['item'],
        methods: {
            //Remove product from cart
            removeFromCart() {
                this.$store.commit('removeFromCart', this.item)
            }
        },
    }
</script>

<style lang="scss">
    .cart-item-card {
        width: 90%;
        margin: 5%;
        background-color: white;
        box-shadow: 0 0 5px gray;
        border-radius: 5px;
        padding: 10px;
        text-align: left;

        .header {
            display: flex;
            justify-content: space-around;
        }
    }
    button.remove-product-button {
        padding: 10px;
        background-color: rgb(187, 79, 79);
        border: none;
        color: white;
        font-weight: bold;
        font-size: 1.15rem;
        border-radius: 5px;
        cursor: pointer;
    }
</style>