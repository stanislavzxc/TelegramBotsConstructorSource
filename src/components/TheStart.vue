<template>
<h3>Старт</h3>
<hr>    
<TheName @update="handleUpdate"/>
</template>

<script>
import TheName from './TheName.vue'
export default {
  components: {
    TheName
  },
  data() {
    return {
     
    };
  },
  methods: {
    handleUpdate(value) {
      this.$emit('update', value)
    }
  },
};
</script>
<style>

</style>
