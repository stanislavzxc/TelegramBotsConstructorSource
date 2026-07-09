<template>
  <div class="val">
    <h3>Валидация</h3>
    <button @click="toggleMenu">{{ selectedMenuItem }}</button>
    <div v-if="isOpen" class="dropdown">
      <ul>
        <li v-for="item in menuItems" :key="item" @click="selectMenuItem(item)">{{ item }}</li>
      </ul>
    </div>
    <div v-if="show2">
      <div v-if="show">
        <h3>Ограничить количество символов</h3>
        <div class="toggle-switch">
          <input type="checkbox" id="switch" v-model="isToggled">
          <label for="switch"></label>
        </div>
        <div class="groups" v-if="isToggled">
          <div class="group">
            <input type="number" class="input" v-model.number="minValue" @blur="validateMin" placeholder="0" min="0" @input="quality($event, 'min')">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Минимум</label>
          </div>
          <div class="group">
            <input type="number" class="input" v-model.number="maxValue" @blur="validateMax" placeholder="100" min="0" @input="quality($event, 'max')">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Максимум</label>
          </div>
        </div>
      </div>
      <div>
        <h3>сообщение об ошибки валидации</h3>
        <textarea 
          placeholder="Оставьте пустым, если хотите обычное сообщение" 
          class="input-style" 
          type="text"
          @input="updateParent($event, 'errValid')">
        </textarea>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show2: false,
      isToggled: false,
      show: false,
      isOpen: false,
      selectedMenuItem: 'Нет',
      menuItems: ['Нет', 'Текст', 'Цифры', 'Диапазон чисел', 'Буквы', 'Буквы и Цифры', 'Номер телефона', 'Email', 'Дата и время', 'URL', 'Изображение', 'Аудио', 'Видео', 'Файл'],
      minValue: '',
      maxValue: ''
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    selectMenuItem(item) {
      this.selectedMenuItem = item;
      this.show = !(item === 'Нет' || item === 'Файл' || item === 'Изображение' || item === 'Видео' || item === 'Аудио');
      this.show2 = !(item === 'Нет');
      this.isOpen = false;
      this.$emit('isOpen', item);
    },
    validateMin() {
      if (!this.minValue || this.minValue < 0 || isNaN(this.minValue)) {
        this.minValue = 0;
      }
    },
    validateMax() {
      if (!this.maxValue || this.maxValue < 0 || isNaN(this.maxValue)) {
        this.maxValue = 100;
      }
    },
    updateParent(event, field) {
      this.$emit('update', field, event.target.value);

    },
    quality(event, field){
      
      this.$emit('quality', field, event.target.value );
    }
  }
};
</script>




  
  <style scoped>
  .dropdown {
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
    background-color: #f1f1f1;
  }
  button{
  text-align: left;
  width: 80%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  background-color: transparent;
}
.val{
    padding-top: 30px;
}
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  border-radius: 17px; 
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
.group {
  position: relative;
  padding-top: 10px;
 }
 
 .input {
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 50%;
  border: none;
  border-bottom: 1px solid #515151;
  background: transparent;
 }
 
 .input:focus {
  outline: none;
 }
 
 /* label {
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
  padding-top: 25px;
 } */
 
 .input:focus ~ label, .input:valid ~ label {
  top: -20px;
  font-size: 14px;
  color: #5264AE;
 }
 
 .bar {
  position: relative;
  display: block;
  width: 50%;
 }
 
 .bar:before, .bar:after {
  content: '';
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #5264AE;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
 }
 
 .bar:before {
  left: 50%;
 }
 
 .bar:after {
  right: 50%;
 }
 
 .input:focus ~ .bar:before, .input:focus ~ .bar:after {
  width: 50%;
 }
 
 .highlight {
  position: absolute;
  height: 60%;
  width: 50%;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
 }
 
 .input:focus ~ .highlight {
  animation: inputHighlighter 0.3s ease;
 }
 
 @keyframes inputHighlighter {
  from {
   background: #5264AE;
  }
 
  to {
   width: 0;
   background: transparent;
  }
 }
 .input-style {
  width: 80%;
  resize: vertical;
  min-height: 100px;
   
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #555;
  outline: none;
}

.input-style:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
  </style>
  