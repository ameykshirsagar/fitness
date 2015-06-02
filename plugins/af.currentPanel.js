(function($){
	$.currentPanel=function(){
		var curentUrl=window.location.href;
		var panelName = curentUrl.split('#')
		return panelName[1];
    };
})(af)