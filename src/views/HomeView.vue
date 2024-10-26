<template>
  <div>
    <div class="header">
      <h1>Product List</h1>
      <div class="btn">
        <button @click="add">ADD</button>
        <button @click="massDelete">MASS DELETE</button>
      </div>
    </div>
    <p v-if="errors" class="error-message">{{ errors }}</p>
    <div class="card-container" v-if="products.length > 0">
      <div class="card" v-for="item in products" :key="item.id">
        <input 
          type="checkbox" 
          class="delete-checkbox" 
          :value="item.id" 
          v-model="selectedProducts" 
        />
        <p>{{ item.sku }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.price }}$</p>
        <p>{{ item.details.weight }}</p>
      </div>
    </div>
    <p v-else>No products available.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      products: [],
      selectedProducts: [],
      errors: null,
    };
  },
  methods: {
    add() {
      this.$router.push('/addproduct');
    },
    async getProduct() {
      try {
        const response = await axios.get('/api/display');
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        this.errors = "Failed to load products.";
      }
    },
    async massDelete() {
      try {
        const response = await axios.post('/api/massdelete', { idarray: this.selectedProducts });
        console.log("Mass delete response:", response.data);
        this.selectedProducts = []; // Clear selected products after delete
        this.getProduct(); // Refresh the product list
      } catch (error) {
        console.error("Error in mass delete:", error);
        this.errors = "Failed to delete selected products.";
      }
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  padding: 10px;
}

.btn {
  display: flex;
  gap: 10px;
}

.card-container {
  display: flex;
  flex-wrap: wrap; 
}

.card {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 20px;
  border: solid black 1px;
  width: 20%;
  padding: 10px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.delete-checkbox {
  margin-bottom: 10px;
  cursor: pointer;
}

button {
  cursor: pointer;
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin: 5px 0;
  font-size: 14px;
}

.card-container p {
  color: #333;
}

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
</style>
