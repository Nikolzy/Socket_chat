<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="400px">
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
  data: () => ({
    valid: true,
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
    },
    change () {
      console.log('aedwdw')
    }
  }
};
</script>
