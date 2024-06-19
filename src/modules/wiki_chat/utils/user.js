export function getCurrentUser() {
  const data = JSON.parse(
    window.parent.document.querySelector('#ticketAppInitialState').innerHTML
  )
  const userId = data.currentUser.userId

  return data.usersOnline.find((user) => user.id === userId)
}
