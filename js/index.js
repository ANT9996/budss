
// COOKIE BANNER
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


// BURGER
const burgerButton = document.getElementById('burgerButton')
const burgerCloseButton = document.getElementById('burgerCloseButton')
const burgerContent = document.getElementById('burgerContent')

burgerButton.addEventListener('click', () => {
  burgerContent.classList.toggle('burger__content--hide')
})

burgerCloseButton.addEventListener('click', () => {
  burgerContent.classList.add('burger__content--hide')
})

// FORM
const form = document.getElementById('form')
const formBlock = document.getElementById('formBlock')
const formCloseButton = document.getElementById('formCloseButton')
const formSubmitButton = document.getElementById('formSubmitButton')
const formError = document.getElementById('formError')

const inputName = document.getElementById('name')
const inputEmail = document.getElementById('email')
const inputPhone = document.getElementById('phone')

const openForm = () => {
  formBlock.classList.remove('d-none')
  burgerContent.classList.add('burger__content--hide')
}

formSubmitButton.addEventListener('click', () => {

  inputName.value = ''
  inputEmail.value = ''
  inputPhone.value = ''
  formSubmitButton.classList.add('button--disabled')

  formBlock.classList.add('d-none')
  thankBlock.classList.remove('d-none')
})

document.querySelectorAll('.formButton')
.forEach((el) => el.addEventListener('click', openForm))


const isValid = (element) => element.value.trim().length < 1 ? false : true;

const checkValidation = () => {
  // проверка наличия всех элементов
  if (!inputName || !inputEmail || !inputPhone) return

  // проверка на заполненость
  [inputName, inputEmail, inputPhone]
  .forEach(element => {
    if (!isValid(element)) {
      formSubmitButton.classList.add('button--disabled')
      element.parentElement.classList.add('form__label--error')
      formError.classList.add('form__error--show')
      return
    } else {
      element.parentElement.classList.remove('form__label--error')
    }

  // проверка емейла на правильность
    const reg = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/);
    if (!reg.test(inputEmail.value)) {
      formSubmitButton.classList.add('button-disabled')
      inputEmail.parentElement.classList.add('form__label--error')
      return
    } else {
      inputEmail.parentElement.classList.remove('form__label--error')
    }
    
    formError.classList.remove('form__error--show')
    formSubmitButton.classList.remove('button--disabled')
  });
}

if (inputName)
inputName.addEventListener('change', checkValidation)

if (inputEmail)
inputEmail.addEventListener('input', checkValidation)

if (inputPhone)
inputPhone.addEventListener('input', checkValidation)

form.addEventListener('submit', (e) => e.preventDefault())
formCloseButton.addEventListener('click', () => {
  formBlock.classList.add('d-none')
})

// Благодарность

const thankBlock = document.getElementById('thank')

const thankCloseButton = document.getElementById('thankCloseButton')
const thankButton = document.getElementById('thankButton')

thankCloseButton.addEventListener('click', () => {thankBlock.classList.add('d-none')})
thankButton.addEventListener('click', () => {thankBlock.classList.add('d-none')})