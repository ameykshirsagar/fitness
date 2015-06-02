(function($){

	$.fn.progressBar=function(percent){
		if(this.length===0) return;
            new pbar(this[0],percent);
        return this;
    };

	var pbar=function(el,percent){
		this.container = $(el);
		if (this.container.children(".progressWrapper").length==0) {
			this.container.html('<div class="progressWrapper"><div class="progressIndicator"></div></div>')
			var progInd = this.container.find($(".progressIndicator").get())
			progInd.css('width',percent+'%')
		}else{
			var progInd = this.container.find($(".progressIndicator").get())
			progInd.css('width',percent+'%')
		}
	};
})(af)