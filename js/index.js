const cookieCloseButton = document.getElementById('cookieCloseButton')
const cookieAcceptButton = document.getElementById('cookieAcceptButton')
const cookieDeclineButton = document.getElementById('cookieDeclineButton')

const closeCookie = () => {
  const cookieBlock = document.getElementById('cookieBlock')
  if (!cookieBlock) return
  cookieBlock.remove()

  cookieCloseButton.removeEventListener('click', closeCookie)
  cookieAcceptButton.removeEventListener('click', closeCookie)
  cookieDeclineButton.removeEventListener('click', closeCookie)
}

cookieCloseButton.addEventListener('click', closeCookie)
cookieAcceptButton.addEventListener('click', closeCookie)
cookieDeclineButton.addEventListener('click', closeCookie)