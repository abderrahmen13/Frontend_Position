<template>
  <div class="home">
    <h1>Browse Our Selection</h1>
    <input
			class="input is-rounded"
			type="text"
			v-model="value"
			:placeholder="placeholder"
			@keyup="search(value)"
		>
    <div class="product-cards-container">
      <ProductSummaryCard
        v-for="(item, i) in items"
        :key="i"
        :product="item"
        v-on:view-product="viewProduct($event)" />
    </div>    
  </div>
</template>

<script>
// @ is an alias to /src
import ProductSummaryCard from '../components/products/ProductSummaryCard.vue'
import axios from 'axios';

export default {
  name: "Home",
  components: {ProductSummaryCard},
  data() {
    return {
      items: [],
      value: ''
    }
  },
  computed: { 
    placeholder () { 
      return 'Search...'; 
    } 
  },
  created() {
    //Get products from Spoonacular
    axios.get(`https://api.spoonacular.com/food/products/search?apiKey=9f3af0f0604642ed81d0a40533a36934&query=pizza&number=10`).then((response) => {
      this.items = response.data.products;
    });
  },
  methods: {
    //Search for products
    search (value) { 
      if (value.length >= 3) { 
        axios.get('https://api.spoonacular.com/food/products/search?apiKey=9f3af0f0604642ed81d0a40533a36934&query='+value+'&number=10').then((response) => {
          this.items = response.data.products;
        });
      } 
    } 
  }
};
</script>

<style lang="scss">
.product-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
