export const state = () => ({
  user: {},
  messages: []
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
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message);
  }
}
