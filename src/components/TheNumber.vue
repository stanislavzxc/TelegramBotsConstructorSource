<template>
   <h3>Запрос номера телефона</h3> 
    <TheText :showButtons="false"  @textChanged="handleTextChange"/>
    <TheToggle :x="'номер телефона'" @skip="toggleSkip"/>
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
    toggleSkip(value){
      this.$emit('skip',value);
    },
    handleTextChange(text) {
      this.$emit('textChanged', text);
    },
  },
  }
  </script>