function sendMail() {
  var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_4jme4za";
  const templateID = "template_gg8jtxh";

	emailjs.send(serviceID, templateID, params).then(
	  (response) => {
		 document.getElementById("sending-spinner").style.display="none";
		 document.getElementById("success-box").style.display="block";
	  },
	  (error) => {
		console.log('FAILED...', error);
		alert(error)
	  },
	);
}