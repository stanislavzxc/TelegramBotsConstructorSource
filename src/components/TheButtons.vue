<template>

  <div>


    <div v-for="(text, index) in textComponents" :key="index" class="text-component-container"> 

      <TheText @text-changed="onTextChange($event, index)"/>

      <button class="delete-button" @click="removeTextComponent(index)">X</button>

    </div>



    <div v-for="(button, index) in selectButtons" :key="index">

      <div class="button-container">


        <button class="button-22" :disabled="button.fileAdded" @click="() => this.$refs[button.type + 'Input'].click()">{{ button.label }}</button>

        <button class="delete-buttonnew" @click="removeSelectButton(index)">X</button>

      </div>



      <div v-if="button.fileAdded">

        <p>{{ button.fileName }}</p>

        <img v-if="button.type === 'photo'" :src="button.fileUrl" alt="Uploaded photo" class="item">

        <video v-if="button.type === 'video'" :src="button.fileUrl" alt="Uploaded video" class="item"></video>

        <audio v-if="button.type === 'audio'" :src="button.fileUrl" alt="Uploaded audio" class="item"></audio>

        <a v-if="button.type === 'file'" :href="button.fileUrl" download class="item">Download file</a>

      </div>


      <hr>

    </div>



    <button class="button-22" @click="addTextComponent">Текст</button>

    <button class="button-22" @click="showSelectButton('photo')">Фото</button>

    <button class="button-22" @click="showSelectButton('video')">Видео</button>

    <button class="button-22" @click="showSelectButton('audio')">Аудио</button>

    <button class="button-22" @click="showSelectButton('file')">Файл</button>



    <input type="file" ref="photoInput" @change="uploadFile('photo', $event)" accept="image/*" style="display: none;"/>

    <input type="file" ref="videoInput" @change="uploadFile('video', $event)" accept="video/*" style="display: none;"/>

    <input type="file" ref="audioInput" @change="uploadFile('audio', $event)" accept="audio/*" style="display: none;"/>

    <input type="file" ref="fileInput" @change="uploadFile('file', $event)" style="display: none;"/>

  </div>

</template>


<script>

import TheText from './TheText.vue';


export default {

  components: {

    TheText

  },

  data() {

    return {

      textComponents: [],

      selectButtons: [],

    }

  },

  methods: {

    addTextComponent() {

      this.textComponents.push({});

    },

    removeTextComponent(index) {

      this.textComponents.splice(index, 1);
      this.$emit('removeTextComponent', index);
    },

    removeSelectButton(index) {
      this.selectButtons.splice(index, 1);
      this.$emit('removeSelectButton', index);
    },

    uploadFile(type, event) {
      const file = event.target.files[0];
      this.$emit('uploadFile', file)
      if (file) {
      alert("Файл ${file.name} успешно добавлен");

      const buttonIndex = this.selectButtons.findIndex(button => button.type === type);

      if (buttonIndex !== -1) {
      this.selectButtons[buttonIndex].fileAdded = true;
      this.selectButtons[buttonIndex].fileName = file.name;
      this.selectButtons[buttonIndex].fileUrl = URL.createObjectURL(file);
      }

      this.$refs[type + 'Input'].value = '';
      }

      },

    showSelectButton(type) {

      this.selectButtons.push({

        type: type,

        label: `Добавить ${type}`,

        fileAdded: false,

        fileName: '',

        fileUrl: ''

      });

    },

    onTextChange(text, index) {

      console.log(`Text changed: ${text} at index ${index}`);
      this.$emit('onTextChange', text, index)

    }

  }

}

</script>

<style scoped >
.item{
  width: 300px;
}
.button-container {
  display: flex;
  align-items: end;
  margin-bottom: 10px; 
}

.delete-buttonnew {
  padding: 0 15px;
  height: 35px; 
  background-color: #ff4d4f;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  position: relative;
  margin-left: 10px;
}

.text-component-container{
  position: relative;
  padding-top: 50px;
}
.delete-button {
  padding: 10px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  bottom: 50px;
  left: 0;
  background-color:rgb(44, 185, 207);
  color: whitesmoke;
}
.button-22 {
  align-items: center;
  text-align: center;
  appearance: button;
  background-color: #0276FF;
  border-radius: 8px;
  border-style: none;
  box-shadow: rgba(255, 255, 255, 0.26) 0 1px 2px inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  /* display: flex; */
  flex-direction: row;
  flex-shrink: 0;
  font-family: "RM Neue",sans-serif;
  font-size: 90%;
  line-height: 1.15;
  margin: 0;
  text-align: center;
  text-transform: none;
  transition: color .13s ease-in-out,background .13s ease-in-out,opacity .13s ease-in-out,box-shadow .13s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 70px;
  height: 35px;
  margin-top: 20px;
  margin-right: 10px;
}

.button-22:active {
  background-color: #006AE8;
}

.button-22:hover {
  background-color: #1C84FF;
}
</style>


