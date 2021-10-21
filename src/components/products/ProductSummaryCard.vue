<template>
    <div class="card">
        <h3>
            {{ product.title }}
        </h3>
        <img :src="product.image" :alt="product.title">
        <button class="view-product-button" @click.prevent="addToCart()" :disabled="added">Add To cart</button>
    </div>
</template>

<script>
    export default {
        props: ['product'],
        data() {
            return {
                added: false,
            }
        },
        created() {
            //Check if the product already added
            let item = this.$store.getters.cartItems.find( i => i.id === this.product.id)
            if(item) this.added = true
        },
        methods: {
            //Add to cart
            addToCart() {
                this.$store.commit('addToCart', this.product)
                //Disable add button
                this.added = true
            },
        },
    }
</script>

<style lang="scss">
.card {
    width: 80%;
    margin: 10%;
    padding: 10px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0 0 5px gray;

    h5.price {
        color: gray;
    }

    p.description {
        font-size: .85rem;
    }

    p.text-muted {
        color: gray;
    }
}

button.view-product-button {
    padding: 10px;
    background-color: rgb(79, 160, 187);
    border: none;
    color: white;
    font-weight: bold;
    font-size: 1.15rem;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
        background: #dddddd;
    }
}

@media (min-width: 500px) {
    .card {
        width: 350px;
        margin: 10px;
    }
}
</style>