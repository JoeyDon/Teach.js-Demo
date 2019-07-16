<template>
  <div id="app">
    <div id="console"></div>
      <video autoplay playsinline muted id="webcam" width="600" height="600"></video>
    <div>
      <button id="class-a">Add A Set</button>
      <button id="class-b">Add B Set</button>
    </div>
    <div id="longsheet">
    a

    </div>
  </div>
</template>

<script>
import JoeyLib from "./lib/JoeyLib"

export default {
  data: () => ({
    instance: null
  }),


  mounted(){
    this.instance = new JoeyLib('webcam','class-a','class-b')
    this.instance.init()
  },

  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  margin-top: 60px;
}

#longsheet{
  height: 5000px;
}
</style>
