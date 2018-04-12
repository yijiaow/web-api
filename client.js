const sendData = (event) => {
  const XHR = new XMLHttpRequest()
  XHR.open('POST', '/new-note')
  XHR.setRequestHeader('Content-Type', 'application/json')

  const FD = new FormData(event.target)
  const obj = Object.create(Object)
  for (let [key, value] of FD.entries()) {
    obj[key] = value
  }

  XHR.addEventListener('load', function (event) {
    alert(event.target.responseText)
  })
  XHR.addEventListener('error', function (event) {
    alert('Oops! Something went wrong.')
  })
  XHR.send(JSON.stringify(obj))
}
const $form = document.querySelector('form')
$form.addEventListener('submit', (event) => {
  event.preventDefault()
  sendData(event)
  $form.reset()
})

const $view = document.querySelector('#view-btn')
$view.addEventListener('click', () => {
  fetch('/all-notes').then(res => console.log(res.json()))
})
