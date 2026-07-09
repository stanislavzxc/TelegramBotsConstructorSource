<template>
  <h3>Заявка</h3>
  <TheToggle2 @change="handleChange"/>
  <h3>Текст Уведомления</h3>
  <TheText :showButtons="false" @textChanged="handleTextChange"/>
  <TheName @update="handleUpdate"/>
  
</template>

<script>
import TheToggle2 from './TheToggle2.vue'
import TheText from './TheText.vue'
import TheName from './TheName.vue'


export default {
  components: {
    TheToggle2,
    TheText,
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
      handleChange(field, value) {
        this.$emit('change',field,value)
      
    },

    handleTextChange(text) {
      this.$emit('textChanged', text);
    },
  },
}
</script>
