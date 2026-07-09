<template>
  <div>
    <h3>Письмо на email</h3>
  </div>
  <TheText :showButtons="false"  @textChanged="handleTextChange"/>
  <TheInputs @head="header" @name="namer"/>
  <TheName @update="handleUpdate"/>
</template>  


  <script>
  import TheInputs from './TheInputs.vue';
import TheText from './TheText.vue';
import TheName from './TheName.vue';
  export default{
  components:{
    TheText,
    TheInputs,
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
    header(field, value){
        this.$emit('head', field, value);
    },
    namer(field, value){
        this.$emit('name', field, value);
      }
  },
  }
  </script>