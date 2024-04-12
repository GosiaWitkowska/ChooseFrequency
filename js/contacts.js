
$('#contact-form').on('submit', function(event) {
    event.preventDefault(); // prevent reload
    
    var formData = new FormData(this);
    formData.append('service_id', 'service_crg9jfm');
    formData.append('template_id', 'template_gg8jtxh');
    formData.append('user_id', '9BI4kuPwAH29iBIF1');
 
    $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
        type: 'POST',
        data: formData,
        contentType: false, // auto-detection
        processData: false // no need to parse formData to string
    }).done(function() {
         document.getElementById("contact-form").style.display="none";
		 document.getElementById("success-box").style.display="block";
    }).fail(function(error) {
        alert('Oops... ' + JSON.stringify(error));
    });
});