
function book_reg() {
}
const scriptURL = 'https://script.google.com/macros/s/AKfycbzbfy74BcdigtTIiuIts-FtAifXqhxIx3Iu49204trekJK6DgXUAEGJpuLvQp4RA-72uw/exec'

const form = document.forms['contact-form']

//form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
//})
//}