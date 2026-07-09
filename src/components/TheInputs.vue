<template>
    <div>
      <div class="container">
        <div class="group">
          <input type="text" class="input" v-model="theme">
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>тема письма</label>
        </div>
        <div class="group">
          <input type="text" class="input" v-model="name">
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>имя рассылки</label>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        theme: '',
        name: ''
      }
    },
    watch: {
      theme(newValue) {
        this.$emit('head', 'Gmailheader', newValue)
        
      },
      name(newValue) {
        this.$emit('name','GmailName', newValue)
        
      }
    }
  }
  </script>

<style scoped>
.container{
    margin-top:20px;
}
    .group {
  position: relative;
  padding-top: 10px;
  margin-bottom:20px;
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
  top: 5px;
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