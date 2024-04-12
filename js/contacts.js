function sendMail() {
  var params = {
    name: document.getElementById("name").value,
    reply_to: document.getElementById("reply_to").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_crg9jfm";
  const templateID = "template_gg8jtxh";

	emailjs.send(serviceID, templateID, params).then(
	  (response) => {
		 document.getElementById("contact-form").style.display="none";
		 document.getElementById("success-box").style.display="block";
	  },
	  (error) => {
		console.log('FAILED...', error);
		alert(error)
	  },
	);
}