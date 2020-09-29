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
          v-for="item in recent"
          :key="item.title"
          @click.prevent
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon :color="item.id === 2 ? 'success' : 'grey'">
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
    drawer: false,
    recent: [
      {
        id: 1,
        active: true,
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Jason Oner',
      },
      {
        id: 2,
        active: true,
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Mike Carlson',
      },
      {
        id: 3,
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Cindy Baker',
      },
      {
        id: 4,
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Ali Connors',
      },
    ]
  }),
  computed: mapState(['user']),
  methods: {
    ...mapMutations(['logout']),
    exit () {
      this.$router.push('/?message=logout');
      this.logout();
    }
  }
};
</script>
