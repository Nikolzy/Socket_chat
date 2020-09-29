<template>
  <div>
    <ul v-for="m in messages" :key="m.text">
      <li>{{ m.text }}</li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    head () {
      return {
        title: `Room "${this.user.room}"`
      }
    },
    name: 'Chat',
    middleware: ['chat'],
    computed: mapState(['user', 'messages'])
  }
</script>
