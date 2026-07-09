<template>
  <div>
    <h3 v-if = show>{{ x ? 'Каналы (Chat_id)' : 'Варианты ответов' }}</h3>
    <h3 v-if = show1>Быстрые сообщения</h3>
    <div class="button-container">
      <div v-for="(response, index) in responses" :key="response.id" class="response-container">
        <input type="text" v-model="response.text" @input="responseAdded(index, response.text)" placeholder="Ответ" class="response-input" >
        <button class="close-button" @click="removeResponse(index)">X</button>
      </div>
      <button class="button-21" role="button" @click="addResponse">{{ x ? 'Добавить канал' : '+ Добавить ответ' }}</button>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  props: {
  show: {
    type: Boolean,
    default: true
  },
  show1: {
    type: Boolean,
    default: false
  },
  x:{
    type: Boolean,
    default: false
  }
},
  data() {
    return {
      responses: [],
      nextId: 0
    };
  },
  methods: {
    addResponse() {
    const newResponse = {
      id: this.nextId++,
      text: ''
    };
    console.log(newResponse)
    this.responses.push(newResponse);
  },
    removeResponse(index) {
      this.responses.splice(index, 1);
      this.$emit('responseRemoved', index);
    },
    responseAdded(index, text) {
      let channels = this.x;
      this.$emit('responseAdded', { index, text, channels});
    },
  },
 
};
</script>

<style scoped >

.newdiv{
  padding: 20px;
  width: 60%;
  height: 50px;
}
.button-21 {
align-items: center;
appearance: none;
background-color: #3EB2FD;
background-image: linear-gradient(1deg, #4F58FD, #149BF3 99%);
background-size: calc(100% + 20px) calc(100% + 20px);
border-radius: 100px;
border-width: 0;
box-shadow: none;
box-sizing: border-box;
color: #FFFFFF;
cursor: pointer;
display: inline-flex;
font-family: CircularStd,sans-serif;
font-size: 1rem;
height: auto;
justify-content: center;
line-height: 1.5;
padding: 6px 20px;
position: relative;
text-align: center;
text-decoration: none;
transition: background-color .2s,background-position .2s;
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;
vertical-align: top;
white-space: nowrap;

}

.button-21:active,
.button-21:focus {
outline: none;
}

.button-21:hover {
background-position: -20px -20px;
}

.button-21:focus:not(:active) {
box-shadow: rgba(40, 170, 255, 0.25) 0 0 0 .125em;
}
.button-container {
display: flex;
justify-content: center;
align-items: center;
flex-direction: column; 
width: 80%;
max-width: 80%;
min-width: 80%;
margin-top: 20px;
}
input{
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
  text-align: center;
}
.response-container {
display: flex;
align-items: center; 
padding: 10px;
width: 100%;
}

.response-input {
flex-grow: 1; 
margin-right: 10px;
height: 40px;
border: 1px solid #ccc; 
border-radius: 10px;
padding: 0 15px;
}

.close-button {
padding: 0 15px;
height: 40px;
background-color: #ff4d4f;
border: none;
border-radius: 10px;
color: white;
cursor: pointer;
font-weight: bold;
}
</style>