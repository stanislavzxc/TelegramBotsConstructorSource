import { defineStore } from 'pinia';

export const useMyStore = defineStore('mystore', {
  state: () => ({
    data: [],
    key: ''
  }),
  actions: {
    addData(newData) {
      const exists = this.data.some(item =>
        item.source === newData.source &&
        item.target === newData.target &&
        item.text === newData.text
      );

      if (!exists) {
        if (newData.sourceNode.name === "TheStart") {
          // Add to the beginning of the array
          this.data.unshift(newData);
        } else {
          // Add to the end of the array
          this.data.push(newData);
        }
      }
    },
    removeData(edgeId) {
      this.data = this.data.filter(item => item.id !== edgeId);
    },
    setApiKey(apiKey) {
      this.key = apiKey;
    },
    updateData(data) {
      this.data[data.id] = data.data;
    }
  }
});
export const HoverStore = defineStore('hoverstore',{
  state: () =>  ({
    isTaked: false,
  }),
  actions: {
    setIsTaked(value) {
      this.isTaked = value;
      console.log(this.isTaked);
    }
  }
});