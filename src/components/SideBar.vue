<template>
  <div :class="['sidebar', { 'is-active': menuActive }]">
    <div class="parent">
      <button class="exit" @click="exit" style="display: flex">
        <img src="@/assets/exit.png" alt="X" class="exit">
        <p style="font-size:larger">Закрыть</p>
      </button>
      <hr>
      <div class="comp">
        <keep-alive>
          <JustMessage v-if="NodeName === 'JustMessage'" @toggle = "handleToggle" @error = "handleError" @quality="handleQuality" @isopen="handleIsOpen" @textChanged="handleTextChanged" @responseAdded='addfunc' @responseRemoved='removeResponse' @update="addname" :key="`just-message-${myid}`"/>
          <TheChain v-else-if="NodeName === 'TheChain'" @removeSelectButton='handleRemoveText' @uploadFile='handleUploadFile' @removeTextComponent="handleRemoveText" @toggle = "handleToggle" @error = "handleError" @quality="handleQuality" @isopen="handleIsOpen" @textChanged="handleTextChanged" @responseAdded='addfunc' @responseRemoved='removeResponse' @update="addname" :key="`thechain-${myid}`"/>
          <TheFast v-else-if="NodeName === 'TheFast'" @textChanged="handleTextChanged" @contact="handleContact" @responseAdded='addfunc' @responseRemoved='removeResponse' @update="addname" :key="`thefast-${myid}`"/>
          <TheStart v-else-if="NodeName === 'TheStart'" @update="addname" :key="`thename-${myid}`"/>
          <TheCondition v-else-if="NodeName === 'TheCondition'" @responseAdded='AddChannel' @responseRemoved='RemoveChannel' @selectItem="handleItem" @update="addname" :key="`thecondition-${myid}`" />
          <TheNumber v-else-if="NodeName === 'TheNumber'" @textChanged="handleTextChanged" @skip="handleSkip" @update="addname" :key="`thenumber-${myid}`"/>
          <TheEmail v-else-if="NodeName === 'TheEmail'" @textChanged="handleTextChanged"  @skip="handleSkip" @update="addname" :key="`theemail-${myid}`"/>
          <TheSend v-else-if="NodeName === 'TheSend'" @contact="handleContact" @update="addname" :key="`thesend-${myid}`"/>
          <TheNot v-else-if="NodeName === 'TheNot'" @contact="handleContact" @textChanged="handleTextChanged" @update="addname" :key="`thenot-${myid}`"/>
          <TheApplication v-else-if="NodeName === 'TheApplication'" @textChanged="handleTextChanged" @change="handleQuality" @update="addname" :key="`theapplication-${myid}`"/>
          <TheEmailSend v-else-if="NodeName === 'TheEmailSend'" @textChanged="handleTextChanged" @name = "handleQuality" @head = "handleQuality" @update="addname" :key="`theemailsend-${myid}`"/>
          <ThePay v-else-if="NodeName === 'TheKassa' " @update="addname"/>
          <component :is="NodeName" v-else :key="`component-${myid}`"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, inject } from 'vue'
import TheStart from './TheStart.vue'
import JustMessage from './JustMessage.vue';
import TheChain from './TheChain.vue';
import TheCondition from './TheCondition.vue';
import TheNumber from './TheNumber.vue';
import TheEmail from './TheEmail.vue';
import TheApplication from './TheApplication.vue'
import TheSend from './TheSend.vue'
import TheNot from './TheNot.vue'
import TheFast from './TheFast.vue';
import TheEmailSend from './TheEmailSend.vue';
import ThePay from './ThePay.vue';

const props = defineProps({
  menuActive: Boolean,
  exit: Function,
})
console.log(props)
let NodeName = inject('NodeName')
let myid = inject('myid')
let nodes = inject('nodes')

// Function to handle text changes
function handleTextChanged(text, index) {
  
  // Найти индекс нужного узла в массиве nodes
  const nodeIndex = nodes.value.findIndex(n => n.id === myid.value);
  if(index !== undefined){
    if (nodeIndex !== -1) {
      nodes.value[nodeIndex].chain[index] = text; 
      
    }
  } else{

    if (nodeIndex !== -1) {
      // Прямо обновить свойство txt в узле массива nodes
      nodes.value[nodeIndex].txt = text; 
      
    }
  }
}
function handleRemoveText(index){
  const nodeIndex = nodes.value.findIndex(n => n.id === myid.value);
  if (nodeIndex !== -1) {
      nodes.value[nodeIndex].chain.splice(index, 1); 
  }
}

function handleUploadFile(file) {
  const reader = new FileReader();
  const nodeIndex = nodes.value.findIndex(n => n.id === myid.value);
  reader.onload = () => {
    const binaryData = reader.result;
    if (nodeIndex !== -1) {
      const nextIndex = nodes.value[nodeIndex].chain.findIndex(item => item === undefined);
      if (nextIndex === -1) {
        nodes.value[nodeIndex].chain.push(binaryData);
      } else {
        nodes.value[nodeIndex].chain[nextIndex] = binaryData;
      }
    }
  };
  reader.readAsBinaryString(file);
}

function AddChannel(data) {
  if(data.channels == true){
    const nodeIndex = nodes.value.findIndex(n => n.id === myid.value);
  
  if (nodeIndex !== -1) {
    // Прямо обновить свойство txt в узле массива nodes
    nodes.value[nodeIndex].channels.push(data.text);
  }
  }
}
function RemoveChannel(data) {
    const nodeIndex = nodes.value.findIndex(n => n.id === myid.value);
  
  if (nodeIndex !== -1) {
    nodes.value[nodeIndex].channels.splice(data, 1);
  }
}
function handleIsOpen(item) {
    
    // Найти индекс нужного узла в массиве nodes
    const nodeIndex = nodes.value.findIndex(n => n.id === myid.value);
    
    if (nodeIndex !== -1) {
      // Обновить свойство validation_type в узле массива nodes
      nodes.value[nodeIndex].validation_type = item;
    }
}
function handleQuality( field, value ) {
    
    // Найти индекс нужного узла в массиве nodes
    const nodeIndex = nodes.value.findIndex(n => n.id === myid.value);
    
    if (nodeIndex !== -1) {
      // Обновить соответствующее поле в узле массива nodes
      nodes.value[nodeIndex][field] = value;
    }
}
function handleError( field, value ) {
    
    // Найти индекс нужного узла в массиве nodes
    const nodeIndex = nodes.value.findIndex(n => n.id === myid.value);
    
    if (nodeIndex !== -1) {
      // Обновить соответствующее поле в узле массива nodes
      if(field === "errValid"){
        nodes.value[nodeIndex].errorVal = value;
      }else{
        nodes.value[nodeIndex].errorCount = value;
      }
    }
}
function handleToggle(name, value) {

  const nodeIndex = nodes.value.findIndex(n => n.id === myid.value);
  
  if (nodeIndex !== -1) {
    // Обновить соответствующее поле в узле массива nodes
    if (name === "isToggled1") {
      nodes.value[nodeIndex].var = value;
    } else if (name === "isToggled2") {
      nodes.value[nodeIndex].repeat = value;
    } else if (name === "isToggled3") {
      nodes.value[nodeIndex].guard = value;
    }
  }
}
function handleItem(item) {
    // Найти индекс нужного узла в массиве nodes
    const nodeIndex = nodes.value.findIndex(n => n.id === myid.value);
    
    if (nodeIndex !== -1) {
      // Обновить свойство validation_type в узле массива nodes
      nodes.value[nodeIndex].condition = item;
    }
}
function handleSkip(item) {
    // Найти индекс нужного узла в массиве nodes
    const nodeIndex = nodes.value.findIndex(n => n.id === myid.value);
    
    if (nodeIndex !== -1) {
      // Обновить свойство validation_type в узле массива nodes
      nodes.value[nodeIndex].skip = item;
    }
}
function handleContact(item) {
    // Найти индекс нужного узла в массиве nodes
    const nodeIndex = nodes.value.findIndex(n => n.id === myid.value);
    
    if (nodeIndex !== -1) {
      // Обновить свойство validation_type в узле массива nodes
      nodes.value[nodeIndex].contact = item;
    }
}

</script>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    TheStart,
    JustMessage,
    TheChain,
    TheCondition,
    TheNumber,
    TheEmail,
    TheApplication,
    TheSend,
    TheNot,
    TheFast,
    TheEmailSend,
    ThePay,
  },
  methods: {
    addfunc(data){
      this.$emit('responseAdded', data);
    },
    removeResponse(index){
      this.$emit('responseRemoved', index)
    },
    addname(value){
      this.$emit('update', value)
    }
  }
})
</script>

<style scoped>
.sidebar {
  position: fixed;
  z-index:2;
  top: 0;
  right: -50%; /* Hidden offscreen */
  width: 40%;
  height: 100%;
  background-color: #f4f4f4;
  transition: right 0.3s;
  overflow-y: auto;
  overflow-x: hidden;
}
.sidebar.is-active {
  right: 0; /* Show the menu */
}
.exit{
  height: 50px;
  text-align: center;
  background: transparent;
  border: none; 
  position: relative;
  right: 8px;
}
.parent{
  padding-left: 30px;
  width: 100%;
  height: 100%;
}
hr{
  color:rgb(168, 168, 168);
  margin: 0;
}
</style>
