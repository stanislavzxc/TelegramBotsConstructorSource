<template>
  <h3>Условие</h3>
  <TheMenu @selectItem = "handleitem" :menu-items1="['Контакт подписан на Телеграм канал/группу','Контакт содержит теги', 'Контакт не содержит теги', 'Сообщение содержит текст','Сообщение совпадает с текстом','Сообщение совпадает с установленным числом','Текущая дата совпадает с установленной датой','Текущее время совпадает с установленным временем','Текущий день недели совпадает с установленными днями','Переменная совпадает с установленным выражением']"/>
  <TheAnswer v-if="this.SelectItem == 'Контакт подписан на Телеграм канал/группу'" :x="true" @responseAdded = 'addfunc' @responseRemoved='removeResponse'/>
  <TheName @update="handleUpdate"/>  
</template>

<script>
import TheName from './TheName.vue';
import TheMenu from './TheMenu.vue'
import TheAnswer from './TheAnswer.vue'
export default {
  components:{
    TheName,
    TheMenu,
    TheAnswer
  },
  data() {
    return {
     SelectItem: ''
    };
  },
  methods: {
    handleUpdate(value) {
      this.$emit('update', value)
    },
    handleitem(item){
      this.SelectItem = item
      console.log(item)
      this.$emit('selectItem', item);
    },
    addfunc(data){
      this.$emit('responseAdded', data);
    },
    removeResponse(index){
      this.$emit('responseRemoved', index)
    },
  },
}
</script>

<style scoped>

</style>