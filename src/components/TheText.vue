<template>
  <div class="text-block">
    <textarea v-model="text" @input="emitTextChange" placeholder="Ваш текст" class="input-style" type="text"></textarea>
    
    <div class="buttons-row" v-if="showButtons">
      <button class="btn" @click="insertText('{{ first name }}')">Имя</button>
      <button class="btn" @click="insertText('{{ last name }}')">Фамилия</button>
      <button class="btn" @click="insertText('{{ phone }}')">Телефон</button>
      <button class="btn" @click="insertText('{{ email }}')">email</button>
    </div>
    <hr>   
  </div>
</template>

<script>
export default {
  props: {
    showButtons: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      text: ''
    };
  },
  methods: {
    insertText(insertion) {
      this.text += insertion;
      this.emitTextChange(); 
    },
    emitTextChange() {
      this.$emit('textChanged', this.text);
    }
  }
}
</script>



<style scoped>
.text-block {
  position: relative;
  margin-top: 10px;
}
.input-style {
  width: 80%;
  resize: vertical;
  min-height: 100px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 0;
  font-size: 16px;
  color: #555;
  outline: none;
}
.input-style:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
.delete-zxc {
  padding: 0 15px;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 25%;
  right: 0;
}
.buttons-row {
  display: flex;
  padding-top: 10px;
}
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  outline: none;
  margin-right:10px;
}
.btn:hover {
  background-color: #0056b3;
}
hr {
  position: relative;
  top: 10px;
}
</style>