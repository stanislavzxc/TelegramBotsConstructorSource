<template>
  <h3>Простое сообщение</h3>
  <TheText @textChanged="handleTextChange"/>
  <TheVal @isOpen = "isopen" @update = "error" @quality = 'count'/>
  <TheAnswer @responseAdded='addfunc' @responseRemoved='removeResponse'/>
  <TheAdd @toggle="handleToggle"/>
  <TheName @update="handleUpdate"/>
</template>

<script>
import TheName from './TheName.vue'
import TheVal from './TheVal.vue'
import TheText from './TheText.vue'
import TheAnswer from './TheAnswer.vue';
import TheAdd from './TheAdd.vue'

export default {
  components: {
    TheName,
    TheVal,
    TheText,
    TheAnswer,
    TheAdd,
  },
  methods: {
    handleTextChange(text) {
      this.$emit('textChanged', text);
    },
    addfunc(data) { 
      this.$emit('responseAdded', data);
    },
    removeResponse(index) {
      this.$emit('responseRemoved', index);
    },
    handleUpdate(value) {
      this.$emit('update', value);
    },
    //validation emits
    isopen(item){
      this.$emit('isopen', item)
    },
    error(field, value){
      this.$emit('error', field, value)
    },
    count(field, value){
      this.$emit('quality', field, value)
    },
    handleToggle(name, value){
      this.$emit('toggle', name, value)
    }
  }
}
</script>
