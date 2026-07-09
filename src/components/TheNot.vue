<template>
    <div>
        <h3>Уведомление для контакта</h3>
        <TheContacts @inputchange="inputchange"/>
        <h3>Текст Уведомления</h3>
        <TheText :showButtons="false"  @textChanged="handleTextChange"/>
        <TheName @update="handleUpdate"/>
    </div>
</template>

<script>
import TheContacts from './TheContacts.vue'
import TheName from './TheName.vue'
import TheText from './TheText.vue'
export default {
    components:{
        TheText,
        TheContacts,
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
    inputchange(value){
      this.$emit('contact',value);
    },
    handleTextChange(text) {
      this.$emit('textChanged', text);
    },
  },
}
</script>