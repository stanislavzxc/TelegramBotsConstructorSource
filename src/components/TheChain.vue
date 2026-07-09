<template>
    <div>
      <h3>Цепочка сообщений</h3>
      <TheText @textChanged="handleTextChange"/>
      <TheButtons @onTextChange = "handleTextChange" @removeTextComponent='handleRemoveText'  @uploadFile='handleUploadFile' @removeSelectButton='handleButton'/>
      <TheVal @isOpen = "isopen" @update = "error" @quality = 'count'/>
      <TheAnswer @responseAdded = 'addfunc' @responseRemoved='removeResponse'/>
      <TheAdd @toggle="handleToggle"/>
      <TheName @update="handleUpdate"/>
    </div>
  </template>
  
  <script>
  import TheButtons from './TheButtons.vue'
import TheAnswer from './TheAnswer.vue';
import TheName from './TheName.vue';
import TheText from './TheText.vue';
import TheVal from './TheVal.vue';
import TheAdd from './TheAdd.vue';
  export default{
    components: {
      TheAnswer,
      TheName,
      TheText,
      TheVal,
      TheButtons,
      TheAdd
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
    isopen(item){
      console.log(item)
      this.$emit('isopen', item)
    },
    error(field, value){
      this.$emit('error', field, value)
    },
    count(field, value){
      this.$emit('quality', field, value)
    },
    handleTextChange(text, index) {
      this.$emit('textChanged', text,index);
    },
    handleToggle(name, value){
      this.$emit('toggle', name, value)
      console.log(name, value)
    },
    handleRemoveText(index){
      this.$emit('removeTextComponent', index);
    },
    handleUploadFile(file){
      this.$emit('uploadFile', file)
    },
    handleButton(index){
      this.$emit('removeSelectButton', index)

    }
    
  },
  }
  </script>