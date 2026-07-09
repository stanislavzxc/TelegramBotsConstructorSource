<template>
  <div id="parent">
    <button @click="openModal" class="create-button">Подключить</button>
    <!-- Модальное окно для ввода API токена -->
    <div v-if="showModal" class="modal">
      <span class="close" @click="closeModal"><h1>x</h1></span>
      <div class="modal-content">
        <h1>Введите API токен вашего бота</h1>
        <p>Его можно получить от @botfather</p>
        <input type="text" v-model="apiKey" placeholder="API вашего бота">
        <div class="create"><button class="create-button" @click="saveApiKey">Сохранить</button></div>
      </div>
    </div>
    
    <!-- Вторая кнопка для показа сообщения -->
    <button @click="showMessage" :disabled="isLoading" class="create-button">
      <span v-if="isLoading" class="loader"></span>
      <span v-else @click="send">Обновить</span>
    </button>
    
    <!-- Сообщение, которое появляется при нажатии на "Обновить" -->
    <div v-if="showMessageFlag" class="yet">
      <div class="message">
        <p>Измнения обновлены!</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useMyStore } from '@/stores/Mystore';

export default {
  data() {
    return {
      showModal: false,
      showMessageFlag: false, 
      isLoading: false,
      apiKey: '' 
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    showMessage() {
    const myStore = useMyStore();
    
    axios({
      method: 'post',
      url: '/stop_polling',
    })
    .then(response => {
      console.log('Stop polling request sent successfully:', response.data);
      
      return axios({
        method: 'post',
        url: '/start_polling',
        data: myStore.$state
      });
    })
    .then(response => {
      console.log('Start polling request sent successfully:', response.data);
    })
    .catch(error => {
      console.error('Error sending POST request:', error);
    });

    if (this.isLoading) return;

    this.isLoading = true;
    this.showMessageFlag = true;

    setTimeout(() => {
      this.showMessageFlag = false;
      this.isLoading = false;
    }, 3000);

    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  },
    saveApiKey() {
      const myStore = useMyStore();
      myStore.setApiKey(this.apiKey);
      this.closeModal();
},
    send() {
      
    }

  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  width: 70%;
  height: 40%; 
  align-items: center;
}
.create-button {
  background-color: #ff00b3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px; 
  font-size: 16px; 
  cursor: pointer;
  margin-right: 10px;
}
.create-button:disabled {
  background-color: #ccc;
  cursor: not-allowed; 
}
.create {
  margin-top: 20px;
}
.yet {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 100px;
  right: 10px;
}
.close {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  /* font-size: 20px; */
}
.modal-content {
  text-align: center;
}
input {
  width: 80%;
  text-align: center;
  padding: 10px;
  border: 1px solid #ccc; 
  border-radius: 5px;
  font-size: 16px; 
  color: #333;
  background-color: #f9f9f9;
  margin-top: 10px;
}
.message {
  background-color: #ff00fb;
  color: white;
  padding: 10px; 
  border-radius: 5px; 
  
  animation: fadeInOut 3s forwards; 
}
@keyframes fadeInOut {
  0% {
    opacity: 1; 
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0; 
  }
}
#parent {
  position: absolute;
  top: 10px;
  left: 10px;
}
.loader {
  border: 2px solid #f3f3f3; 
  border-top: 2px solid #3498db; 
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 2s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
