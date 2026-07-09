<script>
import { initialNodes } from '../initial-elements.js'
import { useVueFlow } from '@vue-flow/core';
export default {
  setup(){
    const { addNodes } = useVueFlow();  
    return {
      addNodes
    }
  },
   components:{
   
  },
  data() {
    return { 
      nodes: initialNodes,
      currentComponent:'TheStart',
      currentComponents: ['TheStart'],
      showModal: false,
      activeCategory: 'Простые',
      categories: ['Простые', 'Уведомления', 'Платежи', /*'Списки и таблицы'*/],
      items: {
        'Простые': ['Старт','Простое сообщение','Цепочки сообщений', 'Условие', 'Запрос номера телефона','Запрос e-mail','Заявка',/*'Отправить сообщение'*/],
        'Уведомления': ['Заявка', 'Уведомление для контакта', /*'Отправить сообщение','Отправить быстрое сообщение',*/'Письмо на Email'],
        'Платежи': ['Юkassa', 'Юmoney', 'Robokassa','Пополнить счет контакта','Списать со счета контакта'],
        // 'Списки и таблицы': ['Чтение записи из списка', 'Добавление записи в список', 'Удаление записей из списка','Чтение строк из таблицы']
      },
      // Инициализация currentItems элементами из категории "Простые"
      currentItems: ['Старт','Простое сообщение','Цепочки сообщений', 'Условие', 'Запрос номера телефона','Запрос e-mail','Заявка',/*'Отправить сообщение'*/],
      images: {
        'Старт': require('@/assets/0.png'),
        'Простое сообщение': require('@/assets/1.png'),
        'Отправить сообщение': require('@/assets/1.png'),
        'Цепочки сообщений': require('@/assets/2.png'),
        'Условие':  require('@/assets/3.png'),
        'Запрос номера телефона': require('@/assets/4.png'),
        'Запрос e-mail': require('@/assets/5.png'),
        'Заявка': require('@/assets/6.png'),
        // 'Записать ответ пользователя в переменную':  require('@/assets/7.png'),
        'Уведомление для контакта': require('@/assets/8.png'),
        'Отправить быстрое сообщение': require('@/assets/1.png'),
        'Письмо на Email': require('@/assets/5.png'),
        'Юkassa': require('@/assets/9.png'),
        'Юmoney': require('@/assets/9.png'),
        'Robokassa': require('@/assets/9.png'),
        'Пополнить счет контакта':require('@/assets/10.png'),
        'Списать со счета контакта':require('@/assets/11.png'),
        'Чтение записи из списка':require('@/assets/12.svg'),
        'Добавление записи в список':require('@/assets/15.svg'),
        'Удаление записей из списка':require('@/assets/14.svg'),
        'Чтение строк из таблицы':require('@/assets/13.svg'),
      },
      text: {
        'Простое сообщение':'Простое текстовое сообщение',
        'Старт': 'Стартовый блок',
        'Цепочки сообщений': 'Цепочка сообщений которая отправляется последовательно',
        'Условие': 'Разделение сценария на 2 продолжения',
        'Запрос номера телефона': 'Запрос номера телефона у пользователя вашего бота',
        'Запрос e-mail': 'Запрос email у пользователя вашего бота',
        'Заявка': 'Отправить заявку на почту и в телеграм',
        'Записать ответ пользователя в переменную': 'Записать ответ пользователя в переменную для дальнейшего пользования',
        'Отправить сообщение': 'Отправить сообщение другому пользователю бота',
        'Уведомление для контакта': 'Отправить уведомление этому контакту бота',
        'Отправить быстрое сообщение': 'Заранее заданное сообщение, от одного пользователя другому пользователю бота без открытия диалога',
        'Письмо на Email': 'Возможность отправить письмо на email пользователя бота',
        'Юkassa': 'Прием платежец с помощью Юkassa',
        'Юmoney': 'Прием платежец с помощью Юmoney',
        'Robokassa': 'Прием платежец с помощью Robokassa',
        'Пополнить счет контакта': 'Пополнение внутреннего счета контакта, либо списание при отрицательном значении',
        'Списать со счета контакта': 'Списание с внутреннего счет контакта'
      }
    };
  },
  methods: { 
    generateUniquePosition() {
      const baseX = 400;
      const baseY = 450;
      const offsetX = 100; // Горизонтальное смещение для каждого нового блока
      const offsetY = 100; // Вертикальное смещение для каждого нового блока

      if (this.nodes.length === 0) {
        return { x: baseX, y: baseY };
      }

      const lastNode = this.nodes[this.nodes.length - 1];
      return {
        x: lastNode.position.x + offsetX,
        y: lastNode.position.y + offsetY
      };
    },

    changeCategory(category) {
      this.activeCategory = category; 
      this.currentItems = this.items[category];
    },
    isActive(category) {
      return this.activeCategory === category;
    },
    addBlock(item){ 
      let it;
      switch(item){
        case 'Простое сообщение':
          it = 'JustMessage';
          break;
          case 'Уведомление для контакта':
            it = 'TheNot';
            break; 
          case 'Отправить быстрое сообщение':
            it = 'TheFast'
            break;
        case 'Старт':
          it = 'TheStart';
          break;
        case 'Цепочки сообщений':
          it = 'TheChain';
          break;
        case 'Условие':
          it = 'TheCondition';
          break;
        case 'Запрос номера телефона':
          it = 'TheNumber';
          break;
        case 'Запрос e-mail':
          it = 'TheEmail';
          break;
        case 'Заявка':
          it = 'TheApplication';
          break;
        case 'Записать ответ пользователя в переменную':
          it = 'TheVar';
          break;
        case 'Отправить сообщение':
          it = 'TheSend';
          break;
        case 'Письмо на Email':
          it = 'TheEmailSend';
          break;
        case 'Юkassa':
        case 'Юmoney':
        case 'Robokassa':
          it = 'TheKassa';
          break;
        case 'Пополнить счет контакта':
          it = 'ThePurchase';
          break;
        case 'Списать со счета контакта':
          it = 'TheRemove';
          break;
        }
    const newNodeId = this.nodes.length > 0 ? String(Math.max(...this.nodes.map(node => Number(node.id))) + 1) : '1';
    let newNodePosition = this.generateUniquePosition();
    
    const newNode = {
      id: newNodeId,
      label: item,
      position: newNodePosition,
      class: 'light',
      name: it,
      type: 'custom',
      txt: item,
      validation_type:'',
      max:'',
      min:'',
      errorVal: '',
      errorCount: '',
      repeat: false,
      guard: false,
      var: false,
      condition: '',
      contact: '',
      email:'',
      telegram:'',
      Gmailheader:'',
      GmailName:'',
      skip: false,
      channels: [],
      chain:[],
    };
    this.currentComponents.push(it);
    this.addNodes([newNode])
    this.nodes.push(newNode);
    this.$emit('add-block', newNode.txt, newNode.id);
    console.log(newNodeId)
    }
  }
};
</script>

<template>
        <div id="window">
          <button id="showme" @click="showModal = true" >Добавить блок</button>
          <div v-if="showModal" class="modal">
            <div class="modal-head">
              <span @click="showModal = false" class="close">&times;</span>
              <p>Создать блок</p>
              <hr>
            </div>
            <div class="modal-body">
              <div class="categories">
                <!-- Обновление содержимого при нажатии на кнопку категории -->
                <button v-for="category in categories" :key="category" @click="changeCategory(category)" :class="{'add-categories': true, 'active': isActive(category)}">
                  <p>{{ category }}</p>
                </button>
            </div>
            <div class="items">
             
              <!-- Отображение элементов текущей категории -->
              <div v-for="item in currentItems" :key="item" class="add-item">
                <button class="cats" @click="showModal = false, addBlock(item)">
                  <div class="container">
                    <div style="display: flex; justify-content: flex-start;">
                      <img :src="images[item]" class="logos"> <!-- Установите желаемую высоту для изображений -->
                      <p style="margin-left: 10px; flex-grow: 1;">{{ item }}</p> <!-- Установите желаемый отступ слева -->
                    </div>
             
                    <p class="text">{{ text[item] }}</p> <!-- Установите margin-left равным ширине изображения плюс отступ -->
                  </div>
                
                </button> 
                <hr>
              </div>
            </div>
          </div>
            </div> 
          </div>
</template>

<style scoped>

.active {
  background-color: rgb(152, 152, 152);
}

#showme{
  background-color: #ff00b3;
  border-radius: 8px;
  border-width: 0;
  color: whitesmoke;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  margin: 0;
  padding: 10px 12px;
  text-align: center;
  transition: all 200ms;
  vertical-align: baseline;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  position: fixed;
  right: 50px;
}
.container{
  display: flex;
   flex-direction: column; 
   align-items: flex-start; 
   width: 100%;
   border-radius: 15px;
}
.text{
  margin-left: calc(60px); 
  flex-grow: 1;
}
.logos{
  width: 50px;
  height: 50px;
}
.categories{
  margin-left: 10px;
  
}
.cats{
  width: 100%;
  border-radius: 15px;
  text-align: left;
  display: flex;
  background-color: transparent;
  outline: none;
  border: none;
}
.cats :hover{
  background-color: rgb(227, 223, 223);
}
.modal-body{
  position: relative;
}
.items{
  position: absolute;
  width:50%;
  right: 50px;
  top: 0;
}
.add-item{
  width: 100%;
  border-radius: 15px;
  margin: 20px;
}
.add-categories{
  margin-left: 30px;
  margin-bottom: 10px;
  display: block;
  width: 30%;
  border-radius: 8px;
  border-width: 0;
  color: #333333;
  cursor: pointer;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 10px 12px;
  text-align: center;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
#window{
  position: absolute;
  right: 50px;
  top: 100px;
  z-index: 1;
}
.parent{
  float: left;
  min-height: 100vh;
  width: 9000px;
  height: 9000px;
}
.build-block{
    float: left;
    height: calc(100vh - 56px);
    margin-left: 70px;
    overflow: auto;
    padding: 20px;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    width: calc(100% - 70px);
}
.header{
  position: fixed;
  z-index: 1;
  top:0;
  left:0;
  width: 100%;
  height: 60px;
  background-color: whitesmoke;
}
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.modal {
  display: block; /* Показать модальное окно */
  position: fixed; /* Оставаться на месте при прокрутке */
  z-index: 1; /* Сидеть над другими элементами */
  left: 0;
  top: 0;
  width: 50%; /* Полная ширина */
  height: 100%; /* Полная высота */
  overflow: auto; /* Включить прокрутку, если нужно */
  background: #fff;
  padding-top: 60px;
  left: 50%;
  transform: translateX(-50%); 
  border-radius: 15px;
  margin-top: 30px;
  background-color: whitesmoke;
}

/* Стили модального содержимого */
.modal-head {
  position: relative;
  bottom: 30px;
  margin-left: 30px;
}

/* Кнопка закрыть (x) */
.close {
  margin-right: 30px;
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
hr{
  margin-top: 20px;
  margin-right: 20px;
  color: whitesmoke;
}
p{
  font-size: 15px;
  font-weight: 00;
}
</style>