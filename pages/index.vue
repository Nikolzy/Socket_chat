<template>
  <v-layout column justify-center align-center class="layout_wrapper">
    <v-flex class="d-flex align-center justify-center">
      <v-card min-width="400px">
        <v-snackbar v-model="snackbar" :timeout="12000" top>
          {{ message }}
          <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-card-title>
          <h1>Nuxt chat</h1>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Room name"
              required
            ></v-text-field>
            <v-btn
              color="success"
              class="mr-4"
              @click="submit"
            >
              Enter
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  layout: 'empty',
  head: {
    title: 'Welcome to Nuxt chat!'
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    }
  },
  mounted () {
    const { message } = this.$route.query;
    if (message === 'noUser') {
      this.message = 'User is not created';
    } else if (message === 'logout') {
      this.message = 'Logout';
    }
    this.snackbar = !!message;
  },
  data: () => ({
    valid: true,
    snackbar: false,
    message: '',
    name: '',
    room: '',
    mapImage: null,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 16) || 'Name must be less than 10 characters',
    ],
    roomRules: [ v => !!v || 'Room name is required' ]
  }),
  methods: {
    ...mapMutations(['setUser']),
    submit () {
      if (this.$refs.form.validate()) {
        // create user
        const user = {
          name: this.name,
          room: this.room
        }
        // emit method 'userJoined' and then in server/app.js socket.on('userJoined', cb)
        this.$socket.emit('userJoined', user, data => {
          // check data validation
          if (typeof data === 'string') {
            console.error(data);
          } else {
            // setup user
            user.id = data.userId;
            this.setUser(user);
            this.$router.push('/chat');
          }
        })
      }
    }
  }
};
</script>

<style>
  .layout_wrapper {
    height: 100%;
  }
  .v-snack__wrapper {
    margin-top: 20px;
  }
</style>
