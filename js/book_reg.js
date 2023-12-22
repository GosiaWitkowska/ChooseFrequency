
	function isFormAvailable(){
		var email = document.getElementById("contact-email").value;
		var name = document.getElementById("contact-name").value;
		return (email != null && email != "" && name != null && name != "");
	}
	
    function send_email(name, email) {

			Email.send({
				Host : "smtp.elasticemail.com",
				Username : "choosefrequency@gmail.com",
				Password : "869976CC3F8BF7E2F23FBEF9CAB889D8C996",
				To : email,
				From : "info@choosefrequency.com",
				Subject : "Create your synchronicities",
				Body : "",
				BodyHtml : `<html><h2>Dear ${name},</h2>
						<strong>Thank you for sharing the passion to create synchronicities and change our faith and the World.</br> 
						Please find the link to the book below: </br>
						https://bit.ly/3RSVe8x </br>
						</br>
						In 2023, I am launching my new online course about creating synchronicities with 10h of theory, exercises and examples.  
						I will send you an email when it becomes available.
						</strong><p>						
						<em> Best Wishes,</em></p><p><em> Malgorzata Witkowska - Choose Frequency</em></p><p><strong> www.choosefrequency.com</strong></p></html>
						<img href="https://www.choosefrequency.com/images/CF_LogoCircle.png"></img>
						
						`,
						
				Attachments : [
					{
						name : "CF_LogoCircle.jpg",
						path : "https://www.choosefrequency.com/images/books/book01_Christmas.jpg"
					}]
			}).then(
			  message => alert(message)
			);
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
		
		var name = document.getElementById("contact-name");
		var email = document.getElementById("contact-email");
		
		
		var url = 'https://script.google.com/macros/s/AKfycbxvuSQCFDR-i6aZqJIU2ikmA5i_XLwwOlHGlY9in9IdZdr1xbGRVij5bkW0BM5NGkGwDg/exec';		
		e.preventDefault()
		fetch(url, { method: 'POST', body: new FormData(form)})
		.then(response => {
			document.getElementById("sending-spinner").style.display="none";
			document.getElementById("success-box").style.display="block";
			 send_email(name, email);
		})
		//.then(() => { window.location.reload(); })
		.catch(error => console.error('Error!', error.message))
	})




  
