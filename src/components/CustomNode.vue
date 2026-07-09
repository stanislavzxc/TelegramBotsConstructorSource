<script>
import { Handle, useVueFlow } from '@vue-flow/core';
import { watch, ref } from 'vue';
import { HoverStore } from '@/stores/Mystore';

export default {
  components: {
    Handle,
  },
  props: {
    nodetext: {
      type: String,
    },
    data: {
      type: Object,
    },
    id: {
      type: Number, // Уникальный идентификатор компонента
    }
  },
  data() {
    return {
      bodies: [],
      connectedText: '', // Добавлено для хранения текста соединения
      index: 1,
      blockname: '',
    };
  },
  computed: {
    newnodetext() {
      if (this.nodetext === 'Условие') {
        return 'Условие';
      } else if (['Robokassa', 'Юkassa', 'Юmoney'].includes(this.nodetext)) {
        return 'Оплата';
      } else {
        return this.nodetext;
      }
    }
  },
  methods: {
    bodyRemoved(index) {
      this.bodies.splice(index, 1);
    },
    addYesNoBlocks() {
      this.bodies.push({ text: 'Да' });
      this.bodies.push({ text: 'Нет' });
    },
    addPaymentBlocks() {
      this.bodies.push({ text: 'Успешная оплата' });
      this.bodies.push({ text: 'Продолжить' });
    },
    onConnect({ sourceHandle }) {
      setTimeout(() => {
        const sourceIndex = sourceHandle.split('-')[1];
        const sourceRef = this.$refs[`${this.id}handleRef-${sourceIndex}`]?.[0];
        const targetRef = this.$refs[`targetHandle`];

        if (sourceHandle === `handle-any${this.id}`) {
          this.connectedText = 'any'; 
        } else {
          this.connectedText = sourceRef?.$el?.dataset?.text || targetRef?.$el?.dataset?.text || '';
        }
        this.$emit("connect", this.connectedText, this.id);
      }, 200);
    }
  },
  mounted() {
    this.blockname = this.nodetext;
    console.log(this.blockname);
    if (this.newnodetext === 'Условие') {
      this.addYesNoBlocks();
    } else if (['Robokassa', 'Юkassa', 'Юmoney'].includes(this.blockname)) {
      this.addPaymentBlocks();
    }

    const { onConnect } = useVueFlow();
    onConnect(this.onConnect);
  },
  setup() {
    const hoverStore = HoverStore();
    const ishover = ref(hoverStore.isTaked);  
    let ishover1 = ref(false);
    

    watch(() => hoverStore.isTaked, (newValue) => {
      ishover.value = newValue; 
    });

    function HoverNode() {
      console.log(ishover.value);
      if (ishover.value === true) {
  
        ishover1.value = true;
      }
    }

    function unHoverNode() {
      ishover1.value = false;
    }

    function handleMouseUp() {
      unHoverNode();
    }

    return { 
      HoverNode,
      unHoverNode,
      handleMouseUp,
      ishover, 
      ishover1,
      
    }
  }
};
</script>


<template>
  <div class="start-block" @mouseenter="HoverNode" @mouseleave="unHoverNode" @mouseup="handleMouseUp" :class="{ taking: ishover1 }">
    <div class="container">
      <Handle 
        type="target" 
        position="left" 
        class="vue-flow__handle" 
        style="opacity: 0 !important; z-index: -10; cursor: grab;" 
        :data-text="'Продолжить'"
        id="target-handle-continue"      
      />
      <div class="header">
        <p class="start">{{ newnodetext }}</p>
      </div>
      <div v-if="blockname !== 'Условие' && !['Robokassa', 'Юkassa', 'Юmoney'].includes(blockname)" class="body">
        <p>Продолжить
          <Handle 
            type="source" 
            position="right" 
            class="vue-flow__handle" 
            :data-text="'Продолжить'" 
            ref="targetHandle"

          />
        </p>
      </div>
      <div v-if="blockname !== 'Условие' && !['Robokassa', 'Юkassa', 'Юmoney'].includes(blockname) && blockname != 'Старт' && blockname != 'Запрос номера телефона' && blockname !='Заявка' && blockname != 'Запрос e-mail' && blockname != 'Письмо на Email' && blockname!='Уведомление для контакта'" class="body">
        <p>другой ответ
          <Handle 
            :id="'handle-any' + id"
            type="source" 
            position="right" 
            class="vue-flow__handle" 
          />
        </p>
      </div>
      <div class="body" v-for="(body, index) in bodies" :key="index">
        <p>{{ body.text }}
          <Handle 
            type="source" 
            position="right" 
            :id="id +'handle-' + index" 
            class="vue-flow__handle" 
            :data-text="body.text"
            :ref="id + 'handleRef-' + index"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.taking {
  box-shadow: 10px 10px 10px 10px rgb(252, 23, 199);
}

p {
  overflow: hidden;
}

.vue-flow__handle-right {
  position: absolute !important;
  top: 60% !important;
  right: 0 !important;
  transform: translateY(-50%) !important;
}

.header {
  width: 100%;
  background-color: white;
}

.body {
  border: 1px solid grey;
  border-radius: 5px;
  margin-top: 5px;
  position: relative;
}

.start-block {
  border: 1px solid #000000;
  border-radius: 4px;
  padding: 15px;
  margin: 10px;
  background-color: #f9f9f9;
  width: 150px;
}

.start-block .start {
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.start-block p {
  margin: 8px 0;
}

.dark-theme {
  --background-color: #333;
  --text-color: #fff;
  --border-color: #444;
  --header-background-color: #222;
  --body-background-color: #444;
}

.start-block {
  background-color: var(--background-color);
  color: var(--text-color);
  border-color: var(--border-color);
}

.header {
  background-color: var(--header-background-color);
}

.body {
  background-color: var(--body-background-color);
}

.start-block .start {
  border-bottom-color: var(--border-color);
}
.vue-flow__handle-left{
  position:absolute !important;
  left: 50% !important;
  width: 100% !important;
  height:100% !important;
}
</style>
