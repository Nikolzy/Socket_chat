export default function ({ store, redirect }) {
  const user = store.getters['getUser']
  if (!user || !Object.keys(user).length) {
    redirect('/?message=noUser')
  }
}
