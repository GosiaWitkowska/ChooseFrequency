
	function isFormAvailable(){
		var email = document.getElementById("form_email").value;
		return (email != null && email != "");
	}

    function book_reg() {

			//var form = document.forms['book-reg-form'];
			var email = $("#contact-email").val();
			var name = $("#contact-name").val();
			/*
			Email.send({
				SecureToken : "dcb07cb7-1ff5-4a55-ba12-70afa765ab5e",
				To : email,
				From : "choosefrequency@gmail.com",
				Subject : "Create your synchronicities.",
				Body : `<html><h2>Dear ${name},</h2><strong>Thank you for ordering your personal reading.</br> Please allow between 2 and 7 days for the reading to be send to you.</strong><p><em> Best Wishes,</em></p><p><em> Let It Go Tarot.</em></p><p><strong> www.letitgotarot.com</strong></p></html>`,
				Attachments : [
					{
						name : "CF_LogoCircle.jpg",
						path : "https://www.choosefrequency.com/images/CF_LogoCircle.png"
					}]
			});
			*/
			//Email.send({
//				SecureToken : "dcb07cb7-1ff5-4a55-ba12-70afa765ab5e",
				//To : "letitgotarot@gmail.com",
				//From : "letitgotarot@gmail.com",
				//Subject : `Personal Reading for ${details.payer.email_address}`,
				//Body : `Personal reading ordered for ${details.payer.email_address}`
			//});
			
			// Use Ajax to submit form data			
			const form = document.forms['book-reg-form']
			
			var url = 'https://script.google.com/macros/s/AKfycbzbfy74BcdigtTIiuIts-FtAifXqhxIx3Iu49204trekJK6DgXUAEGJpuLvQp4RA-72uw/exec';		
			e.preventDefault()
			fetch(url, { method: 'POST', body: new FormData(form)})
			.then(response => alert("Thank you! your form is submitted successfully." ))
			.then(() => { window.location.reload(); })
			.catch(error => console.error('Error!', error.message))

			/*
			var jqxhr = $.post(url, new FormData(form), function(data) {
				console.log("Success! Data: " + data.statusText);		
			}).done(function (){
				document.getElementById("book-reg-form").style.display="none";
				document.getElementById("success-box").style.display="block";
			}).fail(function(data) {
				console.warn("Error! Data: " + data.statusText);
				// HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
				if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
					//alert("Browser is Safari -- we get an error, but the form still submits -- continue.");
					$(location).attr('href',redirectUrl);   
				}
			});
*/
          }