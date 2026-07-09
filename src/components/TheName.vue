<script setup>
import { ref, defineEmits } from 'vue'

const emits = defineEmits(['update'])

const inputValue = ref('')

function handleInput(value) {
  emits('update', value)
}
</script>

<template>
    <div>
        <h3>Имя блока</h3>
        <div class="group">
            <input type="text" class="input" @input="handleInput($event.target.value)" v-model="inputValue">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Имя</label>
        </div>
    </div>
</template>

<style scoped >
h3{
    padding-top: 10px;
}
.group {
  position: relative;
  padding-top: 10px;
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
  padding-top: 25px;
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
