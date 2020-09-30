export const state = () => ({
  user: {},
  messages: [],
  users: []
})

export const getters = {
  getUser: state => state.user
};

export const mutations = {
  setUser (state, payload) {
    state.user = payload;
  },
  logout (state) {
    state.user = {};
    state.messages = [];
    state.users = [];
  },
  SOCKET_newMessage (state, message) {
    state.messages.push(message);
  },
  SOCKET_updateUsers (state, users) {
    state.users = users;
  }
}
