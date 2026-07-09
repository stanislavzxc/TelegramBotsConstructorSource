<template>
  <h3>Отправить сообщение</h3>
  <TheContacts @inputchange="inputchange"/>
  <TheName @update="handleUpdate"/>
  </template>
<script>

import TheContacts from './TheContacts.vue'
import TheName from './TheName.vue'

export default{
  components:{
    TheContacts,
    TheName,
  },
  data() {
    return {
     
    };
  },
  methods: {
    handleUpdate(value) {
      this.$emit('update', value)
    },
    inputchange(value){
      this.$emit('contact',value);
    },
  },
}
</script>

<style scoped>

</style>
