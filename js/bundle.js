(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

	function isFormAvailable(){
		var email = document.getElementById("contact-email").value;
		var name = document.getElementById("contact-name").value;
		return (email != null && email != "" && name != null && name != "");
	}
	
	function api_send (name, email) {
		/* Initialization */
		//const ElasticEmail = require('node_modules/@elasticemail/elasticemail-client');

		const client = ElasticEmail.ApiClient.instance;

		/* Generate and use your API key */
		const apikey = client.authentications['apikey'];
		apikey.apiKey = "8101B53C4E22323142EDB26DC6F020ECFD2D396D516ACB7BAABBAD7D30434CF3D975A10634A5D0A4E6006CB4D0197483";

		/**
		 * Send transactional emails
		 * Example api call that sends transactional email.
		 * Limit of 50 maximum recipients.
		 */

		const emailsApi = new ElasticEmail.EmailsApi();
		const emailData = {
			Recipients: {
				To: ["gosias13@gmail.com"]
			},
			Content: {
				Body: [
					{
						ContentType: "HTML",
						Charset: "utf-8",
						Content: "<strong>Mail content.<strong>"
					},
					{
						ContentType: "PlainText",
						Charset: "utf-8",
						Content: "Mail content."
					}
				],
				From: "info@choosefrequency.com",
				Subject: "Example transactional email"
			}
		};

		const callback = (error, data, response) => {
			if (error) {
				console.error(error);
			} else {
				console.log('API called successfully.');
				console.log('Email sent.');
			}
		};
		emailsApi.emailsTransactionalPost(emailData, callback);

		
	}
	
	
    function send_email(name, email) {
		
			var msgBody = '<html><h2>Dear ' + name + ',</h2>' +
						'<p>Thank you for sharing the passion for creating synchronicities to change your faith and the World.</p>' +
						'<p><strong>Please find the link to the book below: </p>' +
						'<p><a href="https://bit.ly/3RSVe8x">e-Book: "Create your synchronicities"</a></strong></p>' +
						'</br>' +
						'<p>In 2023, I am launching my new online course about creating synchronicities with 10h of theory, exercises and examples.</p>' +
						'<p>I will send you an email when it becomes available.</p>' +
						'<p><img src="https://www.choosefrequency.com/images/CF_LogoCircle.png"  alt="Choose Frequency" width="50" height="50"></img></p>'+
						'<em> Best Wishes,</em></p><p><em> Malgorzata Witkowska - Choose Frequency</em></p><p><strong> www.choosefrequency.com</strong></p></html>';
						

			Email.send({
				Host : "smtp.elasticemail.com",
				Username : "choosefrequency@gmail.com",
				Password : "869976CC3F8BF7E2F23FBEF9CAB889D8C996",
				To : email,
				From : "info@choosefrequency.com",
				Subject : "Create your synchronicities",
				Body : msgBody,						
				Attachments : [
					{
						name : "CF_LogoCircle.jpg",
						path : "https://www.choosefrequency.com/images/books/book01_Christmas.jpg"
					}]
			});
	}
	// Use Ajax to submit form data			
	const form = document.forms['book-reg-form']
	form.addEventListener('submit', e => {
		
		if (!isFormAvailable) {
			alert("Please provide anme and email address. Thank you." );
			return;
		}
		
		document.getElementById("book-reg-form").style.display="none";
		document.getElementById("submit").disabled = true;
		document.getElementById("sending-spinner").style.display="block";
		
		var name = document.getElementById("contact-name").value;
		var email = document.getElementById("contact-email").value;
		
		e.preventDefault();
		api_send(name, email);
		
/*		var url = 'https://script.google.com/macros/s/AKfycbxvuSQCFDR-i6aZqJIU2ikmA5i_XLwwOlHGlY9in9IdZdr1xbGRVij5bkW0BM5NGkGwDg/exec';		
		e.preventDefault()
		fetch(url, { method: 'POST', body: new FormData(form)})
		.then(response => {
			document.getElementById("sending-spinner").style.display="none";
			document.getElementById("success-box").style.display="block";
			send_email(name, email);
		})
		//.then(() => { window.location.reload(); })
		.catch(error => console.error('Error!', error.message))
	*/	
	})




  

},{}]},{},[1]);
