<template>
  <div>
    <div class="header">
      <h1>Product Add</h1>
      <div class="btn">
        <button @click="create">Save</button>
        <button @click="cancel">Cancel</button>
      </div>
    </div>

    <div>
      <form id="product_form">
        <label>Sku:</label>
        <input type="text" id="sku" v-model="inputsku" required />
        <span v-if="errors.sku" class="error">{{ errors.sku }}</span>

        <label>Name:</label>
        <input type="text" id="name" v-model="inputname" required/>
        <span v-if="errors.name" class="error">{{ errors.name }}</span>

        <label>Price:</label>
        <input type="number" id="price" v-model="inputprice" required/>
        <span v-if="errors.price" class="error">{{ errors.price }}</span>

        <label>Product Type:</label>
        <select id="productType" v-model="selectedType" required>
          <option value="1">select...</option>
          <option value="Book">Book</option>
          <option value="Furniture">Furniture</option>
          <option value="DVD">DVD</option>
        </select>
        <span v-if="errors.type" class="error">{{ errors.type }}</span>

        <!-- Conditional Fields -->
        <div v-if="selectedType == 'DVD'" class="conditional-field">
          <label>Size:</label>
          <input type="number" v-model="inputsize"/>
          <span v-if="errors.size" class="error">{{ errors.size }}</span>
        </div>

        <div v-if="selectedType == 'Book'" class="conditional-field">
          <label>Weight:</label>
          <input type="number" v-model="inputweight" />
          <span v-if="errors.weight" class="error">{{ errors.weight }}</span>
        </div>

        <div v-if="selectedType == 'Furniture'" class="conditional-field">
          <label>Width:</label>
          <input type="number" v-model="inputwidth"/>
          <span v-if="errors.width" class="error">{{ errors.width }}</span>

          <label>Height:</label>
          <input type="number" v-model="inputheight" />
          <span v-if="errors.height" class="error">{{ errors.height }}</span>

          <label>Length:</label>
          <input type="number" v-model="inputlenght"/>
          <span v-if="errors.length" class="error">{{ errors.length }}</span>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  data() {
    return {
      selectedType: 1,
      inputsku:'',
      inputname:'',
      inputprice:'',
      inputsize:'',
      inputweight:'',
      inputwidth:'',
      inputheight:'',
      inputlenght:'',
      errors:{},
    };
  },
  methods: {
    cancel() {
      this.$router.push('/');
    },

    async create(){
       this.errors = {};
          let details = {};

      try{
         if (this.selectedType === 'DVD') {
      details = {
        size: this.inputsize,
      };
    } else if (this.selectedType === 'Book') {
      details = {
        weight: this.inputweight,
      };
    } else if (this.selectedType === 'Furniture') {
      details = {
        width: this.inputwidth,
        height: this.inputheight,
        length: this.inputlenght,
      };
    }  
    
    console.log({
    sku: this.inputsku,
    name: this.inputname,
    price: this.inputprice,
    type: this.selectedType,
    details: details
});
        const response = await axios.post('create',{
          sku:this.inputsku,
          name:this.inputname,
          price:this.inputprice,
          type:this.selectedType,
          details:details
          });
          response


          this.cancel();
      }catch(error){
       if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          console.error('An error occurred:', error);
        }      }
    }
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

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  max-width: 400px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

input:focus,
select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 3px rgba(0, 123, 255, 0.25);
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

.conditional-field {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f0f0f0;
  margin-top: 15px;
}
</style>
