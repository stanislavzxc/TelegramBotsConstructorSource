<template>
  <div>
    <h3>Дополнительно</h3>
    <div class="toggle-switch-container">
      <div class="toggle-switch">
        <input type="checkbox" id="switch1" @change="toggleSwitch('isToggled1')">
        <label for="switch1"></label>
      </div>
      <span class="switch-text">Записать ответ пользователя в переменную</span>
    </div>
    <div class="toggle-switch-container">
      <div class="toggle-switch">
        <input type="checkbox" id="switch2" @change="toggleSwitch('isToggled2')">
        <label for="switch2"></label>
      </div>
      <span class="switch-text">Повторный вопрос</span>
    </div>
    <!-- Новый переключатель -->
    <div class="toggle-switch-container">
      <div class="toggle-switch">
        <input type="checkbox" id="switch3" @change="toggleSwitch('isToggled3')">
        <label for="switch3"></label>
      </div>
      <span class="switch-text">Защищенный контент</span>
    </div>
    <!-- Добавьте столько переключателей, сколько вам нужно -->
     <hr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isToggled1: false,
      isToggled2: false,
      isToggled3: false, // Новая переменная для состояния переключателя
      // Добавьте больше переменных по мере необходимости
    }
  },
  methods: {
    toggleSwitch(switchName) {
      this[switchName] = !this[switchName];
      this.$emit('toggle', switchName, this[switchName])
    }
  }
}
</script>

<style scoped >
.toggle-switch-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px; 
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