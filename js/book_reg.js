
	function isFormAvailable(){
		var email = document.getElementById("contact-email").value;
		var name = document.getElementById("contact-name").value;
		return (email != null && email != "" && name != null && name != "");
	}
	
    function send_email(name, email) {
		

			/*var msgBody = '<html><h2>Dear ' + name + ',</h2>' +
						'<p>Thank you for sharing the passion for creating synchronicities to change your faith and the World.</p>' +
						'<p><strong>Please find the link to the book below: </p>' +
						'<p><a href="https://bit.ly/3RSVe8x">e-Book: "Create your synchronicities"</a></strong></p>' +
						'</br>' +
						'<p>In 2024, I am launching my new online course about creating synchronicities with 10h of theory, exercises and examples.</p>' +
						'<p>I will send you an email when it becomes available.</p>' +
						'<p><img src="https://www.choosefrequency.com/images/CF_LogoCircle.png"  alt="Choose Frequency" width="50" height="50"></img></p>'+
						'<em> Best Wishes,</em></p><p><em> Malgorzata Witkowska - Choose Frequency</em></p><p><strong> www.choosefrequency.com</strong></p></html>';
			*/

		var msgBody = '<!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
'<head>' +
'<meta charset="utf-8">' +
'<meta name="color-scheme" content="light">' +
'<meta name="supported-color-schemes" content="light">' +
'</head>' +
'    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #F5F6F8;">' +
'	<center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #F5F6F8;">' +
'<!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" id="body_table" style="background-color: #F5F6F8;"><tbody><tr><td><![endif]-->' +
'	<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="640" style="margin: auto;" class="contentMainTable">' +
'    <tr class="wp-block-editor-spacerblock-v1"><td style="background-color:#F5F6F8;line-height:50px;font-size:50px;width:100%;min-width:100%">&nbsp;</td></tr><tr class="wp-block-editor-imageblock-v1">' +
'<td style="background-color:#ffffff;padding-top:0;padding-bottom:0;padding-left:0;padding-right:0" align="center"><table align="center" width="640" class="imageBlockWrapper" style="width:640px" role="presentation"><tbody><tr><td style="padding:0"><img src="https://choosefrequency.com/images/books/book01_advert.jpg" width="640" height="" alt="" style="border-radius:0px;display:block;height:auto;width:100%;max-width:100%;border:0" class="g-img"></td></tr></tbody></table></td></tr><tr class="wp-block-editor-headingblock-v1"><td valign="top" style="background-color:#ffffff;display:block;padding-top:64px;padding-right:32px;padding-bottom:32px;padding-left:32px;text-align:center"><p style="font-family:Open Sans, sans-serif;text-align:center;line-height:36.80px;font-size:32px;background-color:#ffffff;color:#000000;margin:0;word-break:normal" class="heading1">Dear '+ name +',</p></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:0px 32px 32px 32px;background-color:#ffffff"><p class="paragraph" style="font-family:Open Sans, sans-serif;text-align:left;line-height:30.00px;font-size:15px;margin:0;color:#5f5f5f;word-break:normal">' +
'<strong>Do you recognise synchronicities around you, or do you still call them coincidences?</strong></br></br>' + 
'For example, when you want to attend an event but as a VIP guest. To cover the difference in pricing, you receive an unexpected refund from the insurance you purchased years ago. </br></br>' +
'When you need a formal outfit for your sister''s wedding and you do not have any in your wardrobe. To find in your email inbox a ten-day sales offer for elegant dresses and suits. </br></br>' +
'When you dream about sharing your message and showing people the easier path. To find yourself in a book club society and sign up for a course, "How to write a book in 90 days.", where they teach you how to self-publish. </br></br>' +
'Would you want to create these opportunities yourself, using the power of your thoughts and amplifying them with high-vibing emotions?</br></br>' +
'Do not wait for others to learn it before you to play the role in their synchronicities. Become a magician, too.</br></br>' +
'<strong>Click the button to see what this book has to offer.</strong>' +   
'</p></td></tr><tr class="wp-block-editor-buttonblock-v1" align="center"><td style="background-color:#ffffff;padding-top:20px;padding-right:20px;padding-bottom:60px;padding-left:20px;width:100%" valign="top"><table role="presentation" cellspacing="0" cellpadding="0" class="button-table"><tbody><tr><td valign="top" class="button-td button-td-primary" style="cursor:pointer;border:none;border-radius:4px;background-color:#5457ff;font-size:16px;font-family:Open Sans, sans-serif;width:fit-content;color:#ffffff"><a style="color:#ffffff" href="https://drive.google.com/file/d/1amIy8423DNc-uJHxX8eDJt97rSJA3AC0/view">' +
'    <table role="presentation">' +
'   <tbody><tr><td valign="top" colspan="3" height="16" style="height: 16px; line-height: 1px; padding: 0;"><span style="display: inline-block;">&nbsp;</span></td></tr>' +
'    <tr>' +
'      <td valign="top" width="16" style="width: 16px; line-height: 1px; padding: 0;"><span style="display: inline-block;">&nbsp;</span></td>' +
'      <td valign="top" style="display: inline-block; cursor: pointer; border: none; border-radius: 4px; background-color: #5457ff; font-size: 16; font-family: Open Sans, sans-serif; width: fit-content; font-weight: null; letter-spacing: undefined; color: #ffffff; padding: 0; ">Create your synchronicities</td>' +
'      <td valign="top" width="16" style="width: 16px; line-height: 1px; padding: 0;"><span style="display: inline-block;">&nbsp;</span></td>' +
'    </tr>' +
'    <tr>' +
'      <td valign="top" colspan="3" height="16" style="height: 16px; line-height: 1px; padding: 0;"><span style="display: inline-block;">&nbsp;</span></td>' +
'    </tr>' +
 ' </tbody></table>' +
 '   </a></td></tr></tbody></table></td></tr><tr><td style="padding-top:0;padding-left:0;padding-right:0;padding-bottom:0;background-color:#ffffff"><table role="presentation" class="multi-column" style="width:640px;border-collapse:collapse !important" cellpadding="0" cellspacing="0"><tbody><tr style="padding-top:0;padding-left:0;padding-right:0;padding-bottom:0" class="wp-block-editor-twocolumnsfiftyfiftyblock-v1"><td style="width:320px;float:left" class="wp-block-editor-column single-column"><table role="presentation" align="left" border="0" class="single-column" width="320" style="width:320px;float:left;border-collapse:collapse !important" cellspacing="0" cellpadding="0"><tbody><tr class="wp-block-editor-imageblock-v1"><td style="background-color:#ffffff;padding-top:32px;padding-bottom:32px;padding-left:32px;padding-right:32px" align="center"><table align="center" width="235.52" class="imageBlockWrapper" style="width:235.52px" role="presentation"><tbody><tr><td style="padding:0"><img src="https://www.choosefrequency.com/IMAGES/BOOKS/book01_mockups.png" width="235.52" height="" alt="" style="border-radius:0px;display:block;height:auto;width:100%;max-width:100%;border:0" class="g-img"></td></tr></tbody></table></td></tr></tbody></table></td><td style="width:320px;float:left" class="wp-block-editor-column single-column"><table role="presentation" align="right" border="0" class="single-column" width="320" style="width:320px;float:left;border-collapse:collapse !important" cellspacing="0" cellpadding="0"><tbody><tr class="wp-block-editor-headingblock-v1"><td valign="top" style="background-color:#ffffff;display:block;padding-top:40px;padding-right:32px;padding-bottom:8px;padding-left:32px"><p style="font-family:Open Sans, sans-serif;line-height:21.85px;font-size:19px;background-color:#ffffff;color:#000000;margin:0;word-break:normal" class="heading3">Create your synchronicities</p></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:0px 32px 0px 32px;background-color:#ffffff"><p class="paragraph" style="font-family:Open Sans, sans-serif;line-height:17.25px;font-size:15px;margin:0;color:#5f5f5f;word-break:normal"><del>$12.00</del>&nbsp;<span style="color:#ff3657">$0.00</span></p></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:16px 32px 6px 32px;background-color:#ffffff"><p class="paragraph" style="font-family:Open Sans, sans-serif;line-height:30.00px;font-size:15px;margin:0;color:#5f5f5f;word-break:normal">Creating your synchronicities is never easy. But with help and directions, you can change your story. </p></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr class="wp-block-editor-spacerblock-v1"><td style="background-color:#ffffff;line-height:32px;font-size:32px;width:100%;min-width:100%">&nbsp;</td></tr><tr class="wp-block-editor-imageblock-v1"><td style="background-color:#ffffff;padding-top:0;padding-bottom:0;padding-left:0;padding-right:0" align="center"><table align="center" width="640" class="imageBlockWrapper" style="width:640px" role="presentation"><tbody><tr><td style="padding:0"><img src="https://api.smtprelay.co/userfile/a18de9fc-4724-42f2-b203-4992ceddc1de/n_footer-default.png" width="640" height="" alt="" style="border-radius:0px;display:block;height:auto;width:100%;max-width:100%;border:0" class="g-img"></td></tr></tbody></table></td></tr><tr class="wp-block-editor-socialiconsblock-v1" role="article" aria-roledescription="social-icons" style="display:table-row;background-color:#F5F6F8"><td style="width:100%"><table style="background-color:#F5F6F8;width:100%;padding-top:42px;padding-bottom:32px;padding-left:32px;padding-right:32px;border-collapse:separate !important" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td align="center" valign="top"><div style="max-width:576px"><table role="presentation" style="width:100%" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td valign="top"><div style="margin-left:auto;margin-right:auto;margin-top:-5px;margin-bottom:-5px;width:100%;max-width:156px"><table role="presentation" style="padding-left:210" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><td><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:5px;padding-bottom:5px;padding-left:10px;padding-right:10px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://www.facebook.com/choosefrequency" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/facebook/facebook-round-solid-color.png" width="32" height="32" style="max-width:32px;display:block;border:0" alt="Facebook"></a></td></tr></tbody></table><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:5px;padding-bottom:5px;padding-left:10px;padding-right:10px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://www.youtube.com/@choosefrequency" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/youtube/youtube-round-solid-color.png" width="32" height="32" style="max-width:32px;display:block;border:0" alt="Youtube"></a></td></tr></tbody></table><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:5px;padding-bottom:5px;padding-left:10px;padding-right:10px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://www.instagram.com/choosefrequency" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/instagram/instagram-round-solid-color.png" width="32" height="32" style="max-width:32px;display:block;border:0" alt="Instagram"></a></td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table></td></tr><tr><td valign="top" align="center" style="padding:20px 20px 20px 20px;background-color:#F5F6F8"><p aria-label="Unsubscribe" class="paragraph" style="font-family:Open Sans, sans-serif;text-align:center;line-height:22.00px;font-size:11px;margin:0;color:#5f5f5f;word-break:normal">If you no longer wish to receive mail from us, you can <a class="c0c4d759-1c22-48d4-a614-785d6acaf420-6V201gHRzhDxAzaNqZiJS" href="{unsubscribe}" data-type="mergefield" data-id="c0c4d759-1c22-48d4-a614-785d6acaf420-6V201gHRzhDxAzaNqZiJS" data-filename="" style="color: #5457FF; display: inline-block;" data-mergefield-value="unsubscribe" data-mergefield-input-value="">unsubscribe</a>.<br></p></td></tr></table>' +
'        </center>' +
'    </body>' +
'</html>';			

			Email.send({
				Host : "smtp.elasticemail.com",
				Username : "choosefrequency@gmail.com",
				Password : "869976CC3F8BF7E2F23FBEF9CAB889D8C996",
				To : email,
				From : "info@choosefrequency.com",
				Subject : "Create your synchronicities",
				Body : msgBody				

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
		
		
		
		/*var url = 'https://script.google.com/macros/s/AKfycbxvuSQCFDR-i6aZqJIU2ikmA5i_XLwwOlHGlY9in9IdZdr1xbGRVij5bkW0BM5NGkGwDg/exec';		
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
		e.preventDefault()
		document.getElementById("sending-spinner").style.display="none";
		document.getElementById("success-box").style.display="block";
		send_email(name, email);
	})




  
