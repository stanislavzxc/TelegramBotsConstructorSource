<template>
  <h3>Найстройка оплаты</h3>
  <div class="group">
    <input type="text" class="input" @input="handleInput($event.target.value, 'description')" v-model="descriptionValue">
    <span class="highlight"></span>
    <span class="bar"></span>
    <label>Назначение платежа</label>
  </div>
  <div class="group">
    <input type="text" class="input" @input="handleInput($event.target.value, 'purpose')" v-model="purposeValue">
    <span class="highlight"></span>
    <span class="bar"></span>
    <label>Описание</label>
  </div>
  <div class="group">
    <input type="text" class="input" @input="handleInput($event.target.value, 'sum')" v-model="sumValue">
    <span class="highlight"></span>
    <span class="bar"></span>
    <label>Сумма</label>
  </div>
  <TheName @update="handleUpdate"/>
</template>

<script>
import TheName from './TheName.vue';
export default {
  data() {
    return {
      descriptionValue: '',
      purposeValue: '',
      sumValue: ''
    }
  },
  components: {
    TheName
  },
  methods: {
    handleInput(value, type) {
      if (type === 'sum') {
        if (/^\d+$/.test(value) && value[0]!=0) {
          this.sumValue = value;
        } else {
          this.sumValue = 1;
        }
      } else {
        this[type + 'Value'] = value;
      }
    },
    handleUpdate(value) {
      this.$emit('update', value)
    },
  }
}
</script>
<style scoped>
.group {
  position: relative;
  padding-top: 30px;
 }
 
 .input {
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 80%;
  border: none;
  border-bottom: 1px solid #515151;
  background: transparent;
 }
 
 .input:focus {
  outline: none;
 }
 
 label {
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
  padding-top: 45px;
  
 }
 
 .input:focus ~ label, .input:valid ~ label {
  top: -20px;
  font-size: 14px;
  color: #5264AE;
 }
 
 .bar {
  position: relative;
  display: block;
  width: 100%;
 }
 
 .bar:before, .bar:after {
  content: '';
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #5264AE;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
 }
 
 .bar:before {
  left: 50%;
 }
 
 .bar:after {
  right: 50%;
 }
 
 .input:focus ~ .bar:before, .input:focus ~ .bar:after {
  width: 50%;
 }
 
 .highlight {
  position: absolute;
  height: 60%;
  width: 50%;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
 }
 
 .input:focus ~ .highlight {
  animation: inputHighlighter 0.3s ease;
 }
 
 @keyframes inputHighlighter {
  from {
   background: #5264AE;
  }
 
  to {
   width: 0;
   background: transparent;
  }
 }
</style>