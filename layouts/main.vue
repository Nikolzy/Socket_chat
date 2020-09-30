<template>
  <v-app app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mobile-break-point="650"
      app
    >
      <v-list subheader>
        <v-subheader>Users chat list</v-subheader>
        <v-list-tile
          v-for="item in users"
          :key="item.name"
          @click.prevent
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="item.name"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon :color="item.id === user.id ? 'success' : 'grey'">
              chat_bubble
            </v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            dark
            v-bind="attrs"
            v-on="on"
            @click="exit">
            <v-icon>arrow_back</v-icon>
          </v-btn>
        </template>
        <span>Exit</span>
      </v-tooltip>
      <v-toolbar-title>Chat room - {{ user.room }}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <div style="height: 100%">
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data: () => ({
    drawer: false
  }),
  computed: mapState(['user', 'users']),
  methods: {
    ...mapMutations(['logout']),
    exit () {
      this.$socket.emit('userLeft', this.user.id, () => {
        this.$router.push('/?message=logout');
        this.logout();
      })
    }
  }
};
</script>
