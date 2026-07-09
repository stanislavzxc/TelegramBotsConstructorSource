<template>
    <div class="dropdown-menu-component1">
      <p>Условие</p>
      <button @click="toggleMenu1">{{ selectedMenuItem1 }}</button>
      <div v-if="isOpen1" class="dropdown1">
        <ul>
          <li v-for="item in menuItems1" :key="item" @click="selectMenuItem1(item)">{{ item }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['menuItems1'],
    data() {
      return {
        isOpen1: false,
        selectedMenuItem1: 'Выберите условие',
      };
    },
    methods: {
      toggleMenu1() {
        this.isOpen1 = !this.isOpen1;
      },
      selectMenuItem1(item) {
        this.selectedMenuItem1 = item;
        this.isOpen1 = false;
        this.$emit('selectItem', item);
      }
    }
  };
  </script>
  
  <style scoped>
  .dropdown1 {
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    text-align: left;
    width: 80%;
    
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  
  li:hover {
    background-color: #afadad;
  }
  
  button {
    text-align: left;
    width: 80%;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    background-color: transparent;
  }
  
  .dropdown-menu-component1 {
    position: relative;
    padding-top: 30px;
  }
  </style>