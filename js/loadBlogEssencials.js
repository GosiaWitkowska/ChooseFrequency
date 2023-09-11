document.write('<title>Choose Frequency</title>');

document.write('<meta charset="utf-8">');
document.write('<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0">');
document.write('<meta http-equiv="X-UA-Compatible" content="IE=edge">');
document.write('<link rel="stylesheet" type="text/css" href="../css/style.css" />');
document.write('<link rel="icon" href="../images/CF_LogoCircle.png" type="image/x-icon">');
document.write('<link rel="stylesheet" type="text/css" href="../fonts/fontMonterrat.css">');
document.write('<link rel="stylesheet" href="../css/bootstrap.css">');
document.write('<link rel="stylesheet" href="../css/fonts.css">');
document.write('<link rel="stylesheet" href="../css/style.css">');
document.write('<script type="text/javascript" src="../js/jquery-1.11.1.min.js" ></script>');
document.write('<script src="../js/core.min.js"></script>');
document.write('<script src="../js/script.js"></script>');
$(document).ready(function(){

	var path = window.location.pathname;
	var name = path.split("/").pop();
	
	if(name){
		$("#blog_post").load( name.replace(".html",".txt")  );
		$("#blogPageImage").attr("src", "../images/Blog/" + name.replace(".html","") + "_small.jpg");
	}
});