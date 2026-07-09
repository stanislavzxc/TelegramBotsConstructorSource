<template>
    <div>
      <div class="toggle-switch-container">
        <div class="toggle-switch">
          <input type="checkbox" id="switch10" @change="toggleFeature('email')">
          <label for="switch10"></label>
        </div>
        <span class="switch-text">email</span>
      </div>
  
      <!-- Второй переключатель -->
      <div class="toggle-switch-container">
        <div class="toggle-switch">
          <input type="checkbox" id="switch20" @change="toggleFeature('telegram')">
          <label for="switch20"></label>
        </div>
        <span class="switch-text">telegram</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // props: {
    //   x: {
    //     type: String
    //   },
    //   y: { // Добавляем новый prop для второго переключателя
    //     type: Boolean,
    //     default: true
    //   }
    // },
    data() {
      return {
        isFeatureEnabled: false, // Переменная состояния первого переключателя
        isSecondFeatureEnabled: false, // Переменная состояния второго переключателя
      }
    },
    methods: {
      toggleFeature(featureName) {
        this[featureName] = !this[featureName];
        this.$emit('change', featureName, this[featureName]);
      }
    }
  }
  </script>
  
  <style scoped>
  .toggle-switch-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px; 
    margin-top: 30px;
  }
  
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-right: 10px; 
  }
  
  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .toggle-switch label {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 17px; 
  }
  
  .toggle-switch label:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 13px; 
  }
  
  input:checked + label {
    background-color: #2196F3;
  }
  
  input:focus + label {
    box-shadow: 0 0 1px #2196F3;
  }
  
  input:checked + label:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  </style>