<template>
  <div>
    <!-- <WebControl /> -->
    <WebControl />
  </div>
</template>

<script>
import WebControl from './components/WebControl'


export default {
  components: {
    WebControl,

  },
  data: () => ({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }),
}
</script>
