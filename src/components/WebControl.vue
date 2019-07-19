<template>
  <div id="app">
    <v-layout row wrap class="sticky">
      <v-flex xs6 md3>
        <div id="console" />
      </v-flex>
      <v-flex xs9>
        <video
          autoplay
          playsinline
          muted
          id="webcam"
          width="280"
          height="150"
        />
      </v-flex>
      
      <v-flex xs12>
        <v-btn
          small
          @click="instance.addExample(0)"
        >
          Teach Default
        </v-btn>
        <v-btn
          small
          @click="instance.addExample(1)"
        >
          Teach Up Actions
        </v-btn>
        <v-btn
          small
          @click="instance.addExample(2)"
        >
          Teach Down Actions
        </v-btn>
        <v-btn
          small
          color="red"
          dark
          @click="instance.destroy()"
        >
          Terminate
        </v-btn>
      </v-flex>
    </v-layout>
    
    
    
    <div id="longsheet">
      <p 
      v-for="n in 50"
      :key="n">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus </p>
    </div>

    <div>
      <iframe
        width="1024"
        height="768"
        src="https://www.youtube.com/embed/7AMvqXeHzmY"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen 
      />
    </div>
  </div>
</template>

<script>
import Teach from "../lib/Teach"
export default {
  data: () => ({
    instance: null,
    scrollSpeed: 15
  }),
  mounted(){
    // Create Instance
    this.instance = new Teach('webcam',this.fnGoUp, this.fnGoDown)
    this.instance.init()

    //this.instance.destroy()
  },
  methods:{
    fnGoUp(){
      window.scrollBy(0, -this.scrollSpeed);
    },
    fnGoDown(){
      window.scrollBy(0, this.scrollSpeed);
    }
  }
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#console{
  font-size: 15px;
  line-height: 90%;
  padding-left: 10px
}
div.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  background-color:	#D3D3D3;
  width:25vw;
  border-radius: 20px;
}
</style>