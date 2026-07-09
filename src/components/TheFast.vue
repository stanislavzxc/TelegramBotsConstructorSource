<template>
  <div>
    <h3>Отправить быстрое сообщение</h3>
    <TheContacts @inputchange="inputchange"/>
    <div>
      <p>Сообщение для отправителя</p>
      <TheText :showButtons="false"  @textChanged="handleTextChange"/>
    </div>
    <TheAnswer :show = "false" :show1 = "true" @responseAdded = 'addfunc' @responseRemoved='removeResponse'/>
    <TheName  @update="handleUpdate"/>
  </div>  
</template>
  
  <style>
   #asdasd{
    max-width: 500px;
    background-color: rgb(241, 23, 226);
    position: fixed;
    top: 200px;
    left: 100px;
   }
  </style>
  
  <script>
import TheContacts from './TheContacts.vue';
import TheName from './TheName.vue';
import TheAnswer from './TheAnswer.vue';
import TheText from './TheText.vue';
export default{
  components:{
    TheContacts,
    TheName,
    TheText,
    TheAnswer
  },  
 data() {
  return {
    
  }
 },
 methods: {
    addfunc(data){
      this.$emit('responseAdded', data);
    },
    removeResponse(index){
      this.$emit('responseRemoved', index)
    },
    handleUpdate(value) {
      this.$emit('update', value)
    },
    inputchange(value){
      this.$emit('contact',value);
    },
    handleTextChange(text) {
      this.$emit('textChanged', text);
    },
  },
  
}
</script>