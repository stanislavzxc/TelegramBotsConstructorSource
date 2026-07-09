<template>
  <h3>Запрос email</h3> 
   <TheText :showButtons="false" @textChanged="handleTextChange"/>
   <TheToggle :x="'email'" :y="false" @skip="toggleSkip"/>
   <TheName @update="handleUpdate"/>
</template>
 
 <style>
 </style>
 
 <script>
 import TheToggle from './TheToggle.vue'
 import TheText from './TheText.vue';
 import TheName from './TheName.vue';
 export default{
 components:{
   TheToggle,
   TheText,
   TheName
 },
  data() {
    return {
     
    };
  },
  methods: {
    handleUpdate(value) {
      this.$emit('update', value)
    },
    handleTextChange(text) {
      this.$emit('textChanged', text);
    },
    toggleSkip(value){
      this.$emit('skip',value);
    },
  },
 }
 </script>