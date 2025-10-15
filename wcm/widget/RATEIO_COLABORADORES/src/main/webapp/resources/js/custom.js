/*
 ANALISTA RICARDO ANDRADE       
     24.11.v05
 */
function meuIP(){
    $.ajax({
    	  url: 'http://meuip.com/api/meuip.php',
    	  type: "get",
    	  success: function(DATA) {
    	      console.log("Seu IP é: "+data.response);
    	  },
    	  error: function(jqXHR, textStatus, errorThrown) {
    	      console.log(textStatus + jqXHR.responseText);
    	  }
    	});
}
function topFORM() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
function getBrowserName() {
	// VERIFICA QUAL EH O NAVEGADOR
	if ( navigator.userAgent.indexOf("Edge") > -1 && navigator.appVersion.indexOf('Edge') > -1 ) 
		return 'Edge';
	else if( navigator.userAgent.indexOf("Opera") !== -1 || navigator.userAgent.indexOf('OPR') !== -1 )
		return 'Opera';
	else if( navigator.userAgent.indexOf("Chrome") !== -1 )
		return 'Chrome';
	else if( navigator.userAgent.indexOf("Safari") !== -1)
		return 'Safari';
	else if( navigator.userAgent.indexOf("Firefox") !== -1 ) 
		return 'Firefox';
	else if( ( navigator.userAgent.indexOf("MSIE") !== -1 ) || (!!document.documentMode == true ) ) //IF IE > 10
		return 'IE';
	else 
		return 'unknown';
}
function isMobile(){
   var SO = !navigator.userAgent || navigator.userAgent.match(/FluigApp|Mobile|Android/i) || navigator.userAgent.match(/FluigApp|Mobile|iPhone|iPad|iPod/i) ? "mobile" : "web";
   
   if(WCMAPI.isMobileAppMode())
	   SO ='mobile';
   
   return SO;
}
