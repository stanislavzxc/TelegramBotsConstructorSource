<script setup>
import { ref, provide, watch } from 'vue'
import { VueFlow, useVueFlow} from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { initialEdges, initialNodes } from './initial-elements.js'
import MyIcon from './components/MyIcon.vue'
import TheModal from './components/TheModal.vue'
import SideBar from './components/SideBar.vue'
import CustomNode from './components/CustomNode.vue'
import TheCreate from './components/TheCreate.vue'
import {useMyStore, HoverStore} from './stores/Mystore.js'
const { onPaneReady, onNodeDragStop, onConnect, addEdges,   onEdgeClick } = useVueFlow()

const nodes = ref(initialNodes)
provide('nodes', nodes)
const edges = ref(initialEdges)
const dark = ref(true)
const nodeTextMap = ref({}) 
const Mystore = useMyStore();
const hoverStore = HoverStore();

onPaneReady(({ fitView }) => {
  fitView()
})

onEdgeClick((x) => {
  console.log('edge clicked', x.edge.id);

  edges.value = edges.value.filter(e => e.id !== x.edge.id);

  Mystore.removeData(x.edge.id);
  console.log('store', Mystore.data);
  
  delete connections[x.edge.sourceHandle]; 
});


onNodeDragStop(({ event, nodes, node, intersections }) => {
  console.log('Node Drag Stop', { event, nodes, node, intersections })
})
let TheText = ref('') 
let targetNodeId = ref()
function connectText(text, id){
  if(targetNodeId.value == id){
    TheText.value = text;
  } 
}

let isTaked = ref(false);

function onTaked(){
  isTaked.value = true;
  hoverStore.setIsTaked(isTaked.value)
}

function onUnTaked(){
  isTaked.value = false;
  hoverStore.setIsTaked(isTaked.value)
}

const handles = ["handle-any", "2__handle-right", "handle-0"];
let isMatch = null;
let connections = ref({})

onConnect((connection) => {
  
  if (connections[connection.sourceHandle]) {
        console.log(`Handle ${connection.sourceHandle} уже подключен.`);
        return; 
      }
      connections[connection.sourceHandle] = connection.targetHandle;

  isMatch = handles.some(handle => {
    if (handle === "handle-any") {
        return connection.targetHandle === handle;
    } else if (handle === "handle-0") {
        return connection.targetHandle.startsWith("handle-") && /^\d+$/.test(connection.targetHandle.split('-')[1]);
    } else {
        const regex = new RegExp(`^\\d+__${handle.split('__')[1]}`);
        return regex.test(connection.targetHandle);
    }
});
if (isMatch) {
    return;
}
  console.log('ConnectionMAIN', connection)
  setTimeout(() => {

  
  const edgeId = `${connection.source}-${connection.target}-${Date.now()}`;
  const newEdge = { ...connection, id: edgeId };
  edges.value = [...edges.value, newEdge];
  addEdges(newEdge);

  const { source, target } = connection;

  const sourceNode = nodes.value.find(node => node.id === source);
  const targetNode = nodes.value.find(node => node.id === target);
  targetNodeId.value = sourceNode.id

  setTimeout(() => {
    Mystore.addData({
      id: edgeId,
      target: connection.target,
      source: connection.source,
      targetNode: targetNode,
      sourceNode: sourceNode,
      text: TheText.value
    });
    console.log('store', Mystore.data);
  
}, 300);
});
}, 100);
watch(nodes, (newNodes) => {
  newNodes.forEach((node) => {
    const existingNode = Mystore.data.find((data) => data.sourceNode.id === node.id);
    if (existingNode) {
      Mystore.updateData({
        id: existingNode.id,
        target: existingNode.target,
        source: existingNode.source,
        targetNode: existingNode.targetNode,
        sourceNode: node,
        text: TheText.value,
      });
    
    }
  });
  console.log(Mystore.$state)
}, { deep: true });


// function updatePos() {
//   nodes.value = nodes.value.map((node) => ({
//     ...node,
//     position: {
//       x: Math.random() * 400,
//       y: Math.random() * 400,
//     },
//   }))
// }

// function logToObject() {
//   console.log(toObject())
// }

// function resetTransform() {
//   setViewport({ x: 0, y: 0, zoom: 1 })
// }

function toggleDarkMode() {
  dark.value = !dark.value
}

const menuActive = ref(false)

function toggleMenu(){
  menuActive.value = !menuActive.value
}

function exit(){
  menuActive.value = false
}

const { onNodeClick } = useVueFlow()
let NodeName = ref('')
let txt = ref('')
let selectedNodeId = ref(null)
let noneitem;

provide('NodeName', NodeName)
provide('txt', txt)
provide('myid', selectedNodeId)

onNodeClick(({ node }) => {
  NodeName.value = node.name;
  noneitem = node.txt; 
  selectedNodeId.value = node.id
})

function handleAddBlock(item, id) {
  if (id) {
    nodeTextMap.value[id] = item
  }
}

const data1 = ref({
  text: ''
})

const customNodeComponent = ref(null)

function addfunc(data){
  data1.value.text = data.text
  const index = data.index
  if (customNodeComponent.value && customNodeComponent.value.bodies) {
    if (index === customNodeComponent.value.bodies.length) {
      customNodeComponent.value.bodies.push({ text: data.text })
    } else if (index >= 0 && index < customNodeComponent.value.bodies.length) {
      customNodeComponent.value.bodies[index].text = data.text
    } else {
      console.error('Invalid index:', index)
    }
  } else {
    console.error('customNodeComponent or bodies array is undefined')
  }
}

function removeResponse(index){
  customNodeComponent.value.bodyRemoved(index)
}

function addname(value){
  if (selectedNodeId.value) {
    nodeTextMap.value[selectedNodeId.value] = value;
    if (value === '') {
      nodeTextMap.value[selectedNodeId.value] = noneitem;
    }
  }
}

</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    @nodeClick="toggleMenu"
    :class="{ dark }"
    class="basicflow"
    :default-viewport="{ zoom: 1.5 }"
    :min-zoom="0.2"
    :max-zoom="4"
    @mousedown="onTaked"
    @mouseup="onUnTaked"
  >
    <template #node-custom="customNodeProps">
      <CustomNode
        ref="customNodeComponent"
        v-bind="customNodeProps"
        :data="data1"
        :nodetext="nodeTextMap[customNodeProps.id] || 'Старт'"
        @connect="connectText"
        :id = customNodeProps.id
      />
    </template>
    <Background pattern-color="#aaa" :gap="16"/>
    <MiniMap />
    <Controls position="top-right">
      <!-- <ControlButton title="Reset Transform" @click="resetTransform">
        <MyIcon name="reset" />
      </ControlButton> -->
      <!-- <ControlButton title="Shuffle Node Positions" @click="updatePos">
        <MyIcon name="update" />
      </ControlButton> -->
      <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
        <MyIcon v-if="dark" name="sun" />
        <MyIcon v-else name="moon" />
      </ControlButton>
      <!-- <ControlButton title="Log `toObject`" @click="logToObject">
        <MyIcon name="log" />
      </ControlButton> -->
    </Controls>
  </VueFlow>
  <TheModal @add-block="handleAddBlock"/> 
  <SideBar :menuActive="menuActive" :exit="exit" @responseAdded="addfunc" @responseRemoved="removeResponse" @update="addname"/>
  <TheCreate/>
</template>
